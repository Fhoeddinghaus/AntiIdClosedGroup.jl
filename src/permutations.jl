"""
    perm_rows(A::AbstractMatrix, p::Vector{Int64})::AbstractMatrix

Apply a permutation to the rows of a given Matrix.
Used to create corresponding permutation matrices with `A = identity`.
"""
function perm_rows(A::AbstractMatrix, p::Vector{Int64})::AbstractMatrix
    if !isperm(p)
        throw("p is not a permutation.")
        return nothing
    end
    B = copy(A)
    for i in 1:length(p)
        B[i,:] = A[p[i],:]
    end
    return B
end

"""
    perm_cols(A::AbstractMatrix, p::Vector{Int64})::AbstractMatrix

Apply a permutation to the columns of a given Matrix.
Used to create corresponding inverse permutation matrices with `A = identity`.
"""
function perm_cols(A::AbstractMatrix, p::Vector{Int64})::AbstractMatrix
    if !isperm(p)
        throw("p is not a permutation.")
        return nothing
    end
    B = copy(A)
    for i in 1:length(p)
        B[:,i] = A[:,p[i]]
    end
    return B
end

"""
    apply_permutation(A::AbstractMatrix, p::Vector{Int64})::AbstractMatrix

Applies a given permutation-vector `p` to the given matrix `A` using the corresponding permutation-matrices.
"""
function apply_permutation(A::AbstractMatrix, p::Vector{Int64})::AbstractMatrix
    if !isperm(p)
        throw("p is not a permutation.")
        return nothing
    end
    n = length(p)
    if size(A, 1) != n || size(A,2) != n
        throw("Only square matrices allowed with the same number of rows/columns as the permutation.")
        return nothing
    end
    I = id(n)
    P = perm_rows(I, p)
    P_inv = perm_cols(I,p)
    return P * A * P_inv
end

"""
    print_permutation_cycles(labelled_list::Bijection{String, T}, permutations::Vector{Vector{Int64}}, filename_identifier::String; filename_prefix="permutation_cycles_") where T

Applies all given permutations to all given labelled elements and prints out the permutation cycles using the labels. 
The output is redirected and appended to a file `filename_prefix * filename_identifier * ".txt"`, e.g. `"permutation_cycles_1.txt"`
"""
function print_permutation_cycles(labelled_list::Bijection{String, T}, permutations::Vector{Vector{Int64}}, filename_identifier::String; filename_prefix="permutation_cycles_") where T
    # construct the filename
    filename = filename_prefix * filename_identifier * ".txt"
    n = length(permutations[1])
    # start output in "append" mode
    open(filename, "a") do io
        for k in sort(String.(keys(labelled_list)))
            for i in 1:length(permutations)
                el_prev = labelled_list[k]
                found = String[]
                cond = true
                I = id(n)
                p = permutations[i]
                P = perm_rows(I, p)
                P_inv = perm_cols(I,p)
                
                print(io, "p[$i]: " * k)
                push!(found, k)
                while cond
                    el = P * el_prev * P_inv
                    lbl = labelled_list(el)
                    print(io, " → " * lbl)
                    if lbl in found
                        cond = false
                    end
                    push!(found, lbl)
                    el_prev = el
                end
                println(io,"")
            end
        end
    end
end