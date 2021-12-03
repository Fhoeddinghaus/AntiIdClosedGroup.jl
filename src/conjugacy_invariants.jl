# This file contains some possible functions that are invariant under conjugation.


"""
    ord(g::SparseMatrixCSC{ℤ₂, Int64}, n::Int64)::Int64

Calculate the order of a given element `g`, with `g^order = identity`. Only works for elements with finite order ("order > 0").
"""
function ord(g::SparseMatrixCSC{ℤ₂, Int64}, n::Int64)::Int64
    i = 1
    I = id(n)
    while true
        if g^i == I
            return i
        end
        i += 1
    end
end


# trace in ℤ₂: LinearAlgebra.tr() works automatically
"""
    tr_of_power(g::SparseMatrixCSC{ℤ₂, Int64}, power::Int64)::Int64

Alias for `tr(g^power)`.
"""
tr_of_power(g::SparseMatrixCSC{ℤ₂, Int64}, power::Int64)::Int64 = tr(g^power)


"""
    rank_of_power_plus_id(g::Matrix{ℤ₂}, power::Int64, n)::Int64

Alias for `rank(g^power + id(n))`.
"""
rank_of_power_plus_id(g::Matrix{ℤ₂}, power::Int64, n::Int64)::Int64 = rank(g^power + id(n))

# symmetry: LinearAlgebra.issymmetric() works automatically

# functions for the generalized Arf invariant:
## 1. Vectors in ℤ₂ⁿ
"""
    ℤ₂ⁿ(n::Int64)::Vector{Vector{ℤ₂}}

Calculate all `2^n` possible vectors in ``\\mathbb{Z}_{2}^n``.
"""
ℤ₂ⁿ(n::Int64)::Vector{Vector{ℤ₂}} = [[ℤ₂(parse(Bool,i)) for i in s] for s in SubString.(bitstring.(0:2^n-1), length(bitstring(1))-n+1)]

## 2. ker(g+I) = Vg
"""
    ker_g_plus_id(g::SparseMatrixCSC{ℤ₂, Int64}, n::Int64)::Vector{Vector{ℤ₂}}

We are interested in ``Vg = \\{\\vec{x} \\in \\mathbb{Z}_2^n \\, | \\, g \\cdot \\vec{x} = \\vec{x}\\} = \\{\\vec{x} \\in \\mathbb{Z}_2^n \\, | \\, (g \\pm \\mathbf{1}) \\cdot \\vec{x} = \\vec{0}\\}``.
This means, ``Vg`` is equivalent to the kernel, ``ker(g\\pm I)`` (``\\pm`` is equivalent in ℤ₂).
"""
function ker_g_plus_id(g::SparseMatrixCSC{ℤ₂, Int64}, n::Int64)::Vector{Vector{ℤ₂}}
    # define the null vector
    x0 = zeros(ℤ₂, n)
    Vg = Vector{ℤ₂}[]
    xs = ℤ₂ⁿ(n)
    I = id(n)
    for x in xs
        # test if vector is in kernel
        if (g + I) * x == x0
            # save vector x
            push!(Vg, x)
        end
    end
    return Vg
end

## 3. quadratic form of ℤ₂
"""
    quadratic_form(x::Vector{ℤ₂})::Int8

Quadratic form ``q: \\mathbb{Z}_2^n \\rightarrow \\mathbb{Z}_4,\\, \\vec{x} \\mapsto \\sum_i ( x_i \\mod{4})``.
"""
function quadratic_form(x::Vector{ℤ₂})::Int8
    # convert upwards ℤ₂ⁿ → ℤ₄ⁿ
    x′ = Vector{ℤ₄}(x)
    # sum all components in mod 4
    s = sum(x′)
    return s
end

## 4. GArf
"""
    GArf(f::Function, V::Vector; readable=true)

Implements the GArf-invariant by applying the function `f` to all vectors in `V` (List of Vectors), see:
``\\text{GArf}(q) = phase\\left\\{  \\sum_{\\vec x\\in V_g} i^{q(\\vec x)}  \\right\\}``
"""
function GArf(f::Function, V::Vector; readable=true)
    # define the imaginary unit
    𝑖 = 1im
    # calculate the phase of the sum of 𝑖^f(x) for all x ∈ V using broadcasting (".")
    φ = angle(sum(𝑖.^f.(V)))
    if readable
        # return as readable values
        return ("$(φ/π)π", "$(rad2deg(φ))°")
    else
        # return plain radian value
        return φ
    end
end

## 5. combine all steps to get the final invariant that is used
"""
    generalized_arf(g::SparseMatrixCSC{ℤ₂, Int64}, n::Int64; readable = true)

Combines the calculation of the kernel `Vg = ker_g_plus_id(g,n)` with the generalized Arf invariant `GArf(quadratic_form, Vg)`.
"""
function generalized_arf(g::SparseMatrixCSC{ℤ₂, Int64}, n::Int64; readable = true)
    # calculate the kernel
    Vg = ker_g_plus_id(g, n)
    # calculate the GArf
    return GArf(quadratic_form, Vg; readable=readable)
end