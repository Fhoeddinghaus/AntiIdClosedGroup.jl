"""
    po2ai(idx::Vector{Int64}, n::Int64) -> ai_idx::Vector{Int64}

Generator-Notation: Convert PO notation array (padding ones indices) to AI notation array (anti-identity row/column-indices).
"""
function po2ai(idx::Vector{Int64}, n::Int64)::Vector{Int64}
    ai_idx = collect(1:n)
    setdiff!(ai_idx, idx)
    return ai_idx
end



"""
    ai2po(idx::Vector{Int64}, n::Int64) -> po_idx::Vector{Int64}

Generator-Notation: Convert AI notation array (anti-identity row/column-indices) to PO notation array (padding ones indices).
Not really used much but for completenes. 
    
Equivalent to [`po2ai`](@ref).
"""
function ai2po(idx::Vector{Int64}, n::Int64)::Vector{Int64}
    po_idx = collect(1:n)
    setdiff!(po_idx, idx)
    return po_idx
end



"""
    po2matrix(idx::Vector{Int64}, n::Int64) -> SparseMatrixCSC{ℤ₂, Int64}

Generator-Notation: Convert PO to a `n × n` matrix with the anti-identity sub-block at not idx positions
"""
function po2matrix(idx::Vector{Int64}, n::Int64)::SparseMatrixCSC{ℤ₂, Int64}
    k = n - size(idx, 1)
    M = sparse(zeros(ℤ₂, n, n))
    
    ai_idx = po2ai(idx, n)
    
    # set the anti-identity subblock
    M[ai_idx, ai_idx] = anti_id(k)
    # set padding ones at diagonal
    for i in idx
        M[i,i] = one(ℤ₂)
    end
    return M
end



"""
    po2latex(idx::Vector{Int64}, n::Int64; po_notation::Bool = false, ai_notation::Bool = false, variable = false, hl_po = "red!10", hl_ai = "green!10", wrapper = "equation*", left = "\\\\left(", right = "\\\\right)") -> String

LaTeX: convert PO to a `n × n` LaTeX-Array with options.

- `idx` (required): Vector with indices in padding ones notation.
- `n` (required): outer matrix size (`n × n`).
- `po_notation = false`: prints out the PO notation if true.
- `ai_notation = false`: print out the AI notation if true.
- `variable = false`: String or false. Prints out the String value if not false.
- `hl_po = "red!10"`: false or LaTeX color string. Highlight padding ones with a given background-color.
- `hl_ai = "green!10`: false or LaTeX color string. Highlight anti-identity with a given background-color.
- `wrapper = "equation"`: LaTeX environment, "equation" or "equation*".
- `left = "\\\\left(`: Left bracket.
- `right = "\\\\right)"`: Right bracket.
"""
function po2latex(
        idx::Vector{Int64}, # PO indices
        n::Int64;
        po_notation::Bool = false, # print PO notation before matrix
        ai_notation::Bool = false, # print AI notation before matrix (and after PO notation)
        variable = false,
        hl_po = "red!10", # (false or LaTeX color string) highlight padding ones with background-color
        hl_ai = "green!10", # (false or LaTeX color string)
        wrapper = "equation*", # LaTeX environment (equation or equation*)
        left = "\\left(",
        right = "\\right)"
    )
    k = n - size(idx, 1)
    M = ones(String, n, n)
    ai_idx = po2ai(idx, n)
    
    output = "
\\begin{$wrapper}"
    # variable
    if variable != false
        output *= "
    $variable \\equiv "
    end
    # PO notation
    if po_notation == true
        if length(idx) > 1
            output *= "
    $(tuple(idx...))_{PO}^{(n=$n)} = "
        else
            output *= "
    ($(idx...))_{PO}^{(n=$n)} = "
        end
    end
    # AI notation
    if ai_notation == true
        output *= "
    $(tuple(ai_idx...))_{AI}^{(n=$n)} = "
    end
    
    # set anti-identity subblock
    if hl_ai != false
        hl_ai = "\\cellcolor{$hl_ai}"
    else
        hl_ai = ""
    end
    antiid = fill("$hl_ai 1", k, k)
    for i = 1:k
        antiid[i,i] = "$hl_ai 0"
    end
    
    M[ai_idx,ai_idx] = antiid
    
    # set padding ones at diagonal
    if hl_po != false
        hl_po = "\\cellcolor{$hl_po}"
    else
        hl_po = ""
    end
    for i in idx
        M[i,i] = "$hl_po 1"
    end
    
    # append M to output
    output *= "
    $left\\begin{array}{"
    for i in 1:n
        output *= "c"
    end
    output *= "}"
    
    for i in 1:size(M,1)
        output *= "
        "
        for j in 1:(size(M,2)-1)
            output *= M[i,j] * " & "
        end
        output *= M[i, end] * " \\\\"
    end
    
    output *= "
    \\end{array} $right"
    output *= "
\\end{$wrapper}
    "
end



"""
    all_pos2latex(all_pos, n) -> String

LaTeX: Print LaTeX-Arrays for all given base matrices in PO notation in all_pos with a set of default parameters.

See [`po2latex`](@ref) for more information about the possible parameters.
"""
function all_pos2latex(all_pos, n)
    for idx in all_pos
        println(po2latex(idx, n; po_notation=true, hl_po = false))
    end
end

"""
    inv(A::SparseMatrixCSC{ℤ₂})::Matrix{ℤ₂}

Wrapper for the invariant, converts the SparseMatrix back to a matrix, then calls [`Zd_Arithmetics.inv`](https://fhoeddinghaus.github.io/Zd_Arithmetics.jl/operations/#Base.inv-Union{Tuple{Array{%E2%84%A4d{T,%20d},%202}},%20Tuple{d},%20Tuple{T}}%20where%20{T%3C:Integer,%20d}).
"""
inv(A::SparseMatrixCSC{ℤ₂})::Matrix{ℤ₂} = inv(Matrix{ℤ₂}(A))