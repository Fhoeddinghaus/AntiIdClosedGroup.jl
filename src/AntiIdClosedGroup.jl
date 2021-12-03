module AntiIdClosedGroup

using ClosedGroupFunctions
using Zd_Arithmetics
using SparseArrays
using LinearAlgebra
using Combinatorics
using Bijections

import Zd_Arithmetics: ℤ₂, ℤ₄
import Base: inv

export 

    id,
    anti_id,

    po2ai,
    ai2po,
    po2matrix,
    po2latex,
    all_pos2latex,
    inv,

    first_po,
    next_po,
    construct_generators,

    perm_rows,
    perm_cols,
    print_permutation_cycles,
    apply_permutation,

    ord,
    tr_of_power,
    rank_of_power_plus_id,
    ℤ₂ⁿ,
    ker_g_plus_id,
    quadratic_form,
    GArf

include("anti-identity.jl")
include("notation_converters.jl")
include("generators.jl")
include("permutations.jl")
include("conjugacy_invariants.jl")

end # module
