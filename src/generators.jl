"""
    first_po(n::Int64, k::Int64) -> po_idx::Vector{Int64}

Notation-Generator: Calculate the first generator matrix in PO notation (padding ones indices) by n and k.
"""
function first_po(n::Int64, k::Int64)::Vector{Int64}
    return collect(1:(n-k))
end


"""
    next_po(current_po::Vector{Int64}, n::Int64, i=0) -> next::Vector{Int64}

Notation-Generator: Calculates the next generator matrix in PO notation (padding ones indices) in relation to a given generator matrix in PO notation.
"""
function next_po(current_po::Vector{Int64}, n::Int64, i=0)::Vector{Int64}
    if i > size(current_po,1)
        println("Error: i=$i")
        return nothing
    end
    next = copy(current_po)
    if current_po[end-i] + 1 > n - i
        return next_po(current_po, n, i+1)
    else
        next[end-i] += 1
        for j in (size(next,1) - i + 1):size(next,1)
           next[j] = next[j-1] +1
        end
        return next
    end
end


"""
    construct_generators(n::Int64, k::Int64, prnt = false) -> Ω::Int64, all_pos, all_generating_matrices

Matrix- and Notation-Generator: Calculate all generating matrices (including PO notations) and the number of generating matrices Ω.
"""
function construct_generators(n::Int64, k::Int64, prnt = false)
    # calculate number of possible generating matrices
    Ω = binomial(n,k)
    println("There are Ω = ($n choose $k) = $Ω  possible basic permutations.")

    # Generate all possible padding ones positions first    
    # number of padding ones
    num_pos = n - k
    # save first PO
    all_pos = []
    push!(all_pos, first_po(n,k))
    # save first PO as matrix
    all_generating_matrices = SparseMatrixCSC{ℤ₂, Int64}[]
    push!(all_generating_matrices, po2matrix(all_pos[1],n))

    if prnt
        println(
            "1:\t ", all_pos[1],
            "\t↔ AI:\t ", po2ai(all_pos[1],n), 
            "\tA² Test: ", multiplyZ2(all_generating_matrices[1],all_generating_matrices[1]) == id(n), 
            ": ", all_generating_matrices[1], "\n\n")
    end

    # construct all other generating matrices
    for i in 2:Ω
        next = next_po(all_pos[end],n)
        push!(all_pos, next)
        push!(all_generating_matrices, po2matrix(all_pos[end],n))
        if prnt
            println(
                "$i:\t", next, 
                "\t↔ AI:\t ", po2ai(all_pos[end],n), 
                "\tA² Test: ", multiplyZ2(all_generating_matrices[end],all_generating_matrices[end]) == id(n), 
                ": ", all_generating_matrices[end], "\n\n")
        end
    end
    
    # return all necessary variables
    return Ω, all_pos, all_generating_matrices
end