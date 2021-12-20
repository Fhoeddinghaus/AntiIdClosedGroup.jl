var documenterSearchIndex = {"docs":
[{"location":"example/#Usage-by-Example","page":"Usage by Example","title":"Usage by Example","text":"","category":"section"},{"location":"example/","page":"Usage by Example","title":"Usage by Example","text":"info: Info\nYou can find a notebook version of this example in the repository.","category":"page"},{"location":"example/","page":"Usage by Example","title":"Usage by Example","text":"CurrentModule = AntiIdClosedGroup\nDocTestSetup = quote\n    using AntiIdClosedGroup\nend","category":"page"},{"location":"example/","page":"Usage by Example","title":"Usage by Example","text":"This package directly depends on","category":"page"},{"location":"example/","page":"Usage by Example","title":"Usage by Example","text":"ClosedGroupFunctions.jl\nZd_Arithmetics.jl","category":"page"},{"location":"example/#Install-the-Package","page":"Usage by Example","title":"Install the Package","text":"","category":"section"},{"location":"example/","page":"Usage by Example","title":"Usage by Example","text":"] add git@github.com:Fhoeddinghaus/AntiIdClosedGroup.jl.git","category":"page"},{"location":"example/","page":"Usage by Example","title":"Usage by Example","text":"or","category":"page"},{"location":"example/","page":"Usage by Example","title":"Usage by Example","text":"] add https://github.com/Fhoeddinghaus/AntiIdClosedGroup.jl.git","category":"page"},{"location":"example/#Load-the-Package","page":"Usage by Example","title":"Load the Package","text":"","category":"section"},{"location":"example/","page":"Usage by Example","title":"Usage by Example","text":"using ClosedGroupFunctions\nusing Zd_Arithmetics\n\nimport Zd_Arithmetics: ℤ₂\n\n# for developement, load the local package (see docs/example.ipynb)\n#push!(LOAD_PATH,\"../src/\")\nusing AntiIdClosedGroup","category":"page"},{"location":"example/#Generating-the-group","page":"Usage by Example","title":"Generating the group","text":"","category":"section"},{"location":"example/#Defining-the-parameters","page":"Usage by Example","title":"Defining the parameters","text":"","category":"section"},{"location":"example/","page":"Usage by Example","title":"Usage by Example","text":"n = 5 # size of the outer matrix\nk = 4 # size of the anti-identity sub-block","category":"page"},{"location":"example/#The-standard-generators","page":"Usage by Example","title":"The standard generators","text":"","category":"section"},{"location":"example/","page":"Usage by Example","title":"Usage by Example","text":"Constructing the generators as described in the original thesis using construct_generators.","category":"page"},{"location":"example/","page":"Usage by Example","title":"Usage by Example","text":"Ω, all_pos, all_generators = construct_generators(n,k);","category":"page"},{"location":"example/#Outputting-the-generators-as-LaTeX","page":"Usage by Example","title":"Outputting the generators as LaTeX","text":"","category":"section"},{"location":"example/","page":"Usage by Example","title":"Usage by Example","text":"The generators can be converted to LaTeX-code if needed using po2matrix or all_pos2latex.","category":"page"},{"location":"example/#Generating-the-groups-using-the-ClosedGroupFunctions.jl-Package","page":"Usage by Example","title":"Generating the groups using the ClosedGroupFunctions.jl-Package","text":"","category":"section"},{"location":"example/","page":"Usage by Example","title":"Usage by Example","text":"group, num_all_multiplications = group_generator_basic(all_generators; prnt=false);","category":"page"},{"location":"example/","page":"Usage by Example","title":"Usage by Example","text":"It's not necessary to use the standard generators, as the group_generator_basic takes all kind of elements. Someone may try smaller sets of generators, as seen below (permutations).","category":"page"},{"location":"example/","page":"Usage by Example","title":"Usage by Example","text":"It's advised to save the calculated group to disk for later use by using ClosedGroupFunctions.jl's store_group(...) and load_group(...) functions.","category":"page"},{"location":"example/","page":"Usage by Example","title":"Usage by Example","text":"# store the group to disk\nstore_group(\"n$n\" * \"k$k\", group)\n\n# load the group from disk\ngroup = load_group(\"n$n\" * \"k$k\");","category":"page"},{"location":"example/#Labelling-the-group","page":"Usage by Example","title":"Labelling the group","text":"","category":"section"},{"location":"example/","page":"Usage by Example","title":"Usage by Example","text":"# label the generators\nall_generators_labelled = label_generators(all_generators);\n\n# label the group with the fast method\n#number_of_elements = length(group)\n#labelled_group = labelled_group_generator_simple(all_generators_labelled, number_of_elements);\n\n# or label the group with the shortest possible label (slower method)\nlabelled_group = labelled_group_generator_shortest(all_generators_labelled; prnt=false)[1];","category":"page"},{"location":"example/","page":"Usage by Example","title":"Usage by Example","text":"See ClosedGroupFunctions.jl Documentation.","category":"page"},{"location":"example/","page":"Usage by Example","title":"Usage by Example","text":"# it's advised to store the labelled group for future use\nstore_group(\"n$n\" * \"k$k\", labelled_group; filename_prefix=\"closed_group_labelled_\")\n\n# load the labelled group from disk\nlabelled_group = load_group(\"n$n\" * \"k$k\"; filename_prefix=\"closed_group_labelled_\");","category":"page"},{"location":"example/#Investigation-and-Analysis","page":"Usage by Example","title":"Investigation and Analysis","text":"","category":"section"},{"location":"example/","page":"Usage by Example","title":"Usage by Example","text":"We now want to investigate the group and it's generators further.","category":"page"},{"location":"example/#Permutations","page":"Usage by Example","title":"Permutations","text":"","category":"section"},{"location":"example/","page":"Usage by Example","title":"Usage by Example","text":"To investigate the group/generators under permutations, we first have to label the elements like above and then calculate all possible permutations.","category":"page"},{"location":"example/","page":"Usage by Example","title":"Usage by Example","text":"all_generators_labelled = label_generators(all_generators);","category":"page"},{"location":"example/","page":"Usage by Example","title":"Usage by Example","text":"# all permutations of [1, 2, 3, 4, 5, 6, 7] can be found with Combinatorics.jl\n# either by\n# using Combinatorics\n# collect(permutations(1:n))\n# or without importing (AntiIdClosedGroup depends directly on Combinatorics.jl)\nall_permutations = collect(AntiIdClosedGroup.permutations(1:n));","category":"page"},{"location":"example/","page":"Usage by Example","title":"Usage by Example","text":"Now we can apply the permutations (or just some of them) to the labelled generators by using the following function. The output is redirected and appended into a file with a given prefix (\"permutation_cycles_\") and the identifier (\"tmp_1\"), because it's quite big. See print_permutation_cycles.","category":"page"},{"location":"example/","page":"Usage by Example","title":"Usage by Example","text":"print_permutation_cycles(all_generators_labelled, all_permutations, \"n$n\" * \"k$k\")","category":"page"},{"location":"example/","page":"Usage by Example","title":"Usage by Example","text":"After some analysis of the file, we find a list of permutations, that can construct the other generators from each other. In the outputted file, p[i] corresponds to the ith permutation in the entered list, all_permutations.","category":"page"},{"location":"example/","page":"Usage by Example","title":"Usage by Example","text":"The result can now be used to construct a new, smaller set of generators.","category":"page"},{"location":"example/","page":"Usage by Example","title":"Usage by Example","text":"# in this case, only one permutation is needed to calculate all other generators from one of them.\nselected_permutations = [97] # list of selected permutations\nps = all_permutations[selected_permutations]\n\nPₛ = [perm_rows(id(n), ps[i]) for i in 1:length(ps)]\nQₛ = [perm_cols(id(n), ps[i]) for i in 1:length(ps)] # Q = P_inv\n\n# new set of generators\na = all_generators[1]\nnew_generators = [a, Pₛ..., Qₛ...];","category":"page"},{"location":"example/","page":"Usage by Example","title":"Usage by Example","text":"See perm_rows and perm_cols.","category":"page"},{"location":"example/#Calculate-the-group-with-the-new-generators","page":"Usage by Example","title":"Calculate the group with the new generators","text":"","category":"section"},{"location":"example/","page":"Usage by Example","title":"Usage by Example","text":"group_with_perms, num_all_multiplications_with_perms = group_generator_basic(new_generators; prnt=false);\n\n\n# As explained in the thesis results, the group stays the same under permutations, \n# because all possible permutations are already part of the group.\n# This is therefore a method to possibly find a smaller set of generators.\ngroup == group_with_perms","category":"page"},{"location":"example/#Invariants-and-Conjugacy-Classes","page":"Usage by Example","title":"Invariants and Conjugacy Classes","text":"","category":"section"},{"location":"example/#Calculating-the-conjugacy-classes","page":"Usage by Example","title":"Calculating the conjugacy classes","text":"","category":"section"},{"location":"example/","page":"Usage by Example","title":"Usage by Example","text":"We first calculate the conjugacy classes of the given group using calculate_conjugacy_classes from ClosedGroupFunctions.jl. Note that this package implements a type dispatched version of Base.inv that itself uses the implementation of inv in Zd_Arithmetics.jl. Therefore, the default inverse=inv can be used here.","category":"page"},{"location":"example/","page":"Usage by Example","title":"Usage by Example","text":"conjugacy_classes = calculate_conjugacy_classes(labelled_group);\n\nprintln(\"\\nThere were $(length(conjugacy_classes)) different conjugacy classes found.\")","category":"page"},{"location":"example/","page":"Usage by Example","title":"Usage by Example","text":"# it's advised to store the conjugacy classes for later usage\nstore_group(\"n$n\" * \"k$k\", conjugacy_classes; filename_prefix=\"conjugacy_classes_\")\n\nconjugacy_classes = load_group(\"n$n\" * \"k$k\"; filename_prefix=\"conjugacy_classes_\");","category":"page"},{"location":"example/#Invariants","page":"Usage by Example","title":"Invariants","text":"","category":"section"},{"location":"example/","page":"Usage by Example","title":"Usage by Example","text":"The package provides a few invariants that can be used:","category":"page"},{"location":"example/","page":"Usage by Example","title":"Usage by Example","text":"Order of an element: ord(g, n)\nTrace of an element (with higher powers): tr_of_power(g, power) = tr(g^power)\nRank of an element (+ Id): rank_of_power_plus_id(g, power, n) = rank(g^power + id(n))\nGeneralized Arf invariant of an element: generalized_arf(g, n; readable = true)","category":"page"},{"location":"example/","page":"Usage by Example","title":"Usage by Example","text":"To use this functions for investigation of the conjugacy classes, we can use the functions apply_invariant_to_first_in_class(...) or apply_invariant_to_first_in_all_classes(...) from the ClosedGroupFunctions.jl package.","category":"page"},{"location":"example/","page":"Usage by Example","title":"Usage by Example","text":"Both of these functions expect an invariant with exactly one argument: the element g. Therefore we have to define wrappers for the invariants, that we want to look at.","category":"page"},{"location":"example/","page":"Usage by Example","title":"Usage by Example","text":"prnt = false;","category":"page"},{"location":"example/","page":"Usage by Example","title":"Usage by Example","text":"# 1. order\norder(g) = ord(g,n)\norder_values = apply_invariant_to_first_in_all_classes(conjugacy_classes, labelled_group, order; prnt=prnt);","category":"page"},{"location":"example/","page":"Usage by Example","title":"Usage by Example","text":"# 2. trace\n# 2.1 power = 1\ntr¹(g) = tr_of_power(g, 1)\ntr¹_values = apply_invariant_to_first_in_all_classes(conjugacy_classes, labelled_group, tr¹; prnt=prnt);\nprintln(\"\")\n\n# 2.2 power = 2\ntr²(g) = tr_of_power(g, 2)\ntr²_values = apply_invariant_to_first_in_all_classes(conjugacy_classes, labelled_group, tr²; prnt=prnt);\n\n# ... maybe higher powers","category":"page"},{"location":"example/","page":"Usage by Example","title":"Usage by Example","text":"# 3. rank\n# 3.1 rank(g^1 + I)\nrank¹(g) = rank_of_power_plus_id(Matrix(g), 1, n) # sometimes a wrapping of g with Matrix(g) is needed\nrank¹_values = apply_invariant_to_first_in_all_classes(conjugacy_classes, labelled_group, rank¹; prnt=prnt);\nprintln(\"\")\n\n# 3.2 rank(g^2 + I)\nrank²(g) = rank_of_power_plus_id(Matrix(g), 2, n)\nrank²_values = apply_invariant_to_first_in_all_classes(conjugacy_classes, labelled_group, rank²; prnt=prnt);\n\n# ... maybe higher powers","category":"page"},{"location":"example/","page":"Usage by Example","title":"Usage by Example","text":"# 4. GArf\ngarf(g) = generalized_arf(g, n; readable=true)\ngarf_values = apply_invariant_to_first_in_all_classes(conjugacy_classes, labelled_group, garf; prnt=prnt);","category":"page"},{"location":"example/","page":"Usage by Example","title":"Usage by Example","text":"The *_values arrays now contain all values that are invariant for the conjugacy class with the same index as the value.","category":"page"},{"location":"example/#Pretty-output-of-the-values-using-a-HTML-table","page":"Usage by Example","title":"Pretty output of the values using a HTML table","text":"","category":"section"},{"location":"example/","page":"Usage by Example","title":"Usage by Example","text":"Just for completeness, here is a 'pretty' way of printing all values.","category":"page"},{"location":"example/","page":"Usage by Example","title":"Usage by Example","text":"# list of invariants (columns) to print out in the form of label => values\ncolumn_keys = [\"# of elements in Cl(x)\", \"ord(g)\", \"tr(g^1)\", \"tr(g^2)\", \"rank(g^1 + 1)\", \"rank(g^2 + 1)\", \"GArf [radian, °]\"]\ncolumns = Dict([\n        \"# of elements in Cl(x)\" => length.(conjugacy_classes),\n        \"ord(g)\" => order_values,\n        \"tr(g^1)\" => tr¹_values,\n        \"tr(g^2)\" => tr²_values,\n        \"rank(g^1 + 1)\" => rank¹_values,\n        \"rank(g^2 + 1)\" => rank²_values,\n        \"GArf [radian, °]\" => garf_values\n        ])\n\nHTML() do io\n    println(io, \"<table><thead>\n            <tr>\n                <td>Conjugacy Class No.</td>\n                <td>x for Cl(x)</td>\")\n    for l in column_keys\n        println(io, \"<td>\" * l * \"</td>\")\n    end\n    println(io, \"\n                \n            </tr>\n        </thead><tbody>\")\n    for i in 1:length(conjugacy_classes)\n        println(io, \"<tr><td>$i</td><td>\" * sort(collect(conjugacy_classes[i]))[1] * \"</td>\")\n        for l in column_keys\n             println(io, \"<td>$(columns[l][i])</td>\")\n        end\n        println(io, \"</tr>\")\n    end\n    \n    println(io, \"</tbody></table>\")\nend","category":"page"},{"location":"example/","page":"Usage by Example","title":"Usage by Example","text":"For the example stated above (n=5, k=4):","category":"page"},{"location":"example/","page":"Usage by Example","title":"Usage by Example","text":"Conjugacy Class No. x for Cl(x) # of elements in Cl(x) ord(g) tr(g^1) tr(g^2) rank(g^1 + 1) rank(g^2 + 1) GArf [radian, °]\n1 a 15 2 1 1 1 0 (\"0.0π\", \"0.0°\")\n2 ab 40 3 0 0 3 3 (\"-0.75π\", \"-135.0°\")\n3 abc 90 4 1 1 3 2 (\"0.25π\", \"45.0°\")\n4 abcd 144 5 0 0 5 5 (\"0.25π\", \"45.0°\")\n5 abcde 120 6 1 1 4 5 (\"0.25π\", \"45.0°\")\n6 abcecd 90 4 1 1 3 2 (\"0.0π\", \"0.0°\")\n7 abdcdea 120 6 0 0 4 3 (\"0.25π\", \"45.0°\")\n8 abdebc 40 3 1 1 5 5 (\"0.25π\", \"45.0°\")\n9 abeb 45 2 1 1 2 0 (\"0.0π\", \"0.0°\")\n10 aedbcbe 15 2 1 1 2 0 (\"0.0π\", \"0.0°\")\n11 cc 1 1 1 1 0 0 (\"-0.75π\", \"-135.0°\")","category":"page"},{"location":"notation/#Notation-Converters","page":"Notation Converters","title":"Notation Converters","text":"","category":"section"},{"location":"notation/","page":"Notation Converters","title":"Notation Converters","text":"There are some helper functions that can handle and produce the AI- and PO-notation as used in the original thesis. The AI-notation only lists the row/column indices that contain the anti-identity, the PO-notation lists only the indices of the 'padding-ones'.","category":"page"},{"location":"notation/","page":"Notation Converters","title":"Notation Converters","text":"CurrentModule = AntiIdClosedGroup\nDocTestSetup = quote\n    using AntiIdClosedGroup\nend","category":"page"},{"location":"notation/","page":"Notation Converters","title":"Notation Converters","text":"Modules = [AntiIdClosedGroup]\nPages = [\"notation_converters.jl\"]","category":"page"},{"location":"notation/#AntiIdClosedGroup.ai2po-Tuple{Vector{Int64}, Int64}","page":"Notation Converters","title":"AntiIdClosedGroup.ai2po","text":"ai2po(idx::Vector{Int64}, n::Int64) -> po_idx::Vector{Int64}\n\nGenerator-Notation: Convert AI notation array (anti-identity row/column-indices) to PO notation array (padding ones indices). Not really used much but for completenes. \n\nEquivalent to po2ai.\n\n\n\n\n\n","category":"method"},{"location":"notation/#AntiIdClosedGroup.all_pos2latex-Tuple{Any, Any}","page":"Notation Converters","title":"AntiIdClosedGroup.all_pos2latex","text":"all_pos2latex(all_pos, n) -> String\n\nLaTeX: Print LaTeX-Arrays for all given base matrices in PO notation in all_pos with a set of default parameters.\n\nSee po2latex for more information about the possible parameters.\n\n\n\n\n\n","category":"method"},{"location":"notation/#AntiIdClosedGroup.po2ai-Tuple{Vector{Int64}, Int64}","page":"Notation Converters","title":"AntiIdClosedGroup.po2ai","text":"po2ai(idx::Vector{Int64}, n::Int64) -> ai_idx::Vector{Int64}\n\nGenerator-Notation: Convert PO notation array (padding ones indices) to AI notation array (anti-identity row/column-indices).\n\n\n\n\n\n","category":"method"},{"location":"notation/#AntiIdClosedGroup.po2latex-Tuple{Vector{Int64}, Int64}","page":"Notation Converters","title":"AntiIdClosedGroup.po2latex","text":"po2latex(idx::Vector{Int64}, n::Int64; po_notation::Bool = false, ai_notation::Bool = false, variable = false, hl_po = \"red!10\", hl_ai = \"green!10\", wrapper = \"equation*\", left = \"\\\\left(\", right = \"\\\\right)\") -> String\n\nLaTeX: convert PO to a n × n LaTeX-Array with options.\n\nidx (required): Vector with indices in padding ones notation.\nn (required): outer matrix size (n × n).\npo_notation = false: prints out the PO notation if true.\nai_notation = false: print out the AI notation if true.\nvariable = false: String or false. Prints out the String value if not false.\nhl_po = \"red!10\": false or LaTeX color string. Highlight padding ones with a given background-color.\nhl_ai = \"green!10: false or LaTeX color string. Highlight anti-identity with a given background-color.\nwrapper = \"equation\": LaTeX environment, \"equation\" or \"equation*\".\nleft = \"\\\\left(: Left bracket.\nright = \"\\\\right)\": Right bracket.\n\n\n\n\n\n","category":"method"},{"location":"notation/#AntiIdClosedGroup.po2matrix-Tuple{Vector{Int64}, Int64}","page":"Notation Converters","title":"AntiIdClosedGroup.po2matrix","text":"po2matrix(idx::Vector{Int64}, n::Int64) -> SparseMatrixCSC{ℤ₂, Int64}\n\nGenerator-Notation: Convert PO to a n × n matrix with the anti-identity sub-block at not idx positions\n\n\n\n\n\n","category":"method"},{"location":"notation/#Base.inv-Tuple{SparseArrays.SparseMatrixCSC{Zd_Arithmetics.ℤd{Bool, 2}, Ti} where Ti<:Integer}","page":"Notation Converters","title":"Base.inv","text":"inv(A::SparseMatrixCSC{ℤ₂})::Matrix{ℤ₂}\n\nWrapper for the invariant, converts the SparseMatrix back to a matrix, then calls Zd_Arithmetics.inv.\n\n\n\n\n\n","category":"method"},{"location":"generators/#Generators","page":"Generators","title":"Generators","text":"","category":"section"},{"location":"generators/","page":"Generators","title":"Generators","text":"CurrentModule = AntiIdClosedGroup\nDocTestSetup = quote\n    using AntiIdClosedGroup\nend","category":"page"},{"location":"generators/","page":"Generators","title":"Generators","text":"Modules = [AntiIdClosedGroup]\nPages = [\"generators.jl\"]","category":"page"},{"location":"generators/#AntiIdClosedGroup.construct_generators","page":"Generators","title":"AntiIdClosedGroup.construct_generators","text":"construct_generators(n::Int64, k::Int64, prnt = false) -> Ω::Int64, all_pos, all_generating_matrices\n\nMatrix- and Notation-Generator: Calculate all generating matrices (including PO notations) and the number of generating matrices Ω.\n\n\n\n\n\n","category":"function"},{"location":"generators/#AntiIdClosedGroup.first_po-Tuple{Int64, Int64}","page":"Generators","title":"AntiIdClosedGroup.first_po","text":"first_po(n::Int64, k::Int64) -> po_idx::Vector{Int64}\n\nNotation-Generator: Calculate the first generator matrix in PO notation (padding ones indices) by n and k.\n\n\n\n\n\n","category":"method"},{"location":"generators/#AntiIdClosedGroup.next_po","page":"Generators","title":"AntiIdClosedGroup.next_po","text":"next_po(current_po::Vector{Int64}, n::Int64, i=0) -> next::Vector{Int64}\n\nNotation-Generator: Calculates the next generator matrix in PO notation (padding ones indices) in relation to a given generator matrix in PO notation.\n\n\n\n\n\n","category":"function"},{"location":"conjugacy-invariants/#Analysis-of-the-conjugacy-classes-via-invariants","page":"Analysis of the conjugacy classes via invariants","title":"Analysis of the conjugacy classes via invariants","text":"","category":"section"},{"location":"conjugacy-invariants/","page":"Analysis of the conjugacy classes via invariants","title":"Analysis of the conjugacy classes via invariants","text":"CurrentModule = AntiIdClosedGroup\nDocTestSetup = quote\n    using AntiIdClosedGroup\nend","category":"page"},{"location":"conjugacy-invariants/","page":"Analysis of the conjugacy classes via invariants","title":"Analysis of the conjugacy classes via invariants","text":"Modules = [AntiIdClosedGroup]\nPages = [\"conjugacy_invariants.jl\"]","category":"page"},{"location":"conjugacy-invariants/#AntiIdClosedGroup.GArf-Tuple{Function, Vector{T} where T}","page":"Analysis of the conjugacy classes via invariants","title":"AntiIdClosedGroup.GArf","text":"GArf(f::Function, V::Vector; readable=true)\n\nImplements the GArf-invariant by applying the function f to all vectors in V (List of Vectors), see: textGArf(q) = phaseleft  sum_vec xin V_g i^q(vec x)  right\n\n\n\n\n\n","category":"method"},{"location":"conjugacy-invariants/#AntiIdClosedGroup.generalized_arf-Tuple{SparseArrays.SparseMatrixCSC{Zd_Arithmetics.ℤd{Bool, 2}, Int64}, Int64}","page":"Analysis of the conjugacy classes via invariants","title":"AntiIdClosedGroup.generalized_arf","text":"generalized_arf(g::SparseMatrixCSC{ℤ₂, Int64}, n::Int64; readable = true)\n\nCombines the calculation of the kernel Vg = ker_g_plus_id(g,n) with the generalized Arf invariant GArf(quadratic_form, Vg). See ker_g_plus_id, quadratic_form and GArf.\n\n\n\n\n\n","category":"method"},{"location":"conjugacy-invariants/#AntiIdClosedGroup.ker_g_plus_id-Tuple{SparseArrays.SparseMatrixCSC{Zd_Arithmetics.ℤd{Bool, 2}, Int64}, Int64}","page":"Analysis of the conjugacy classes via invariants","title":"AntiIdClosedGroup.ker_g_plus_id","text":"ker_g_plus_id(g::SparseMatrixCSC{ℤ₂, Int64}, n::Int64)::Vector{Vector{ℤ₂}}\n\nWe are interested in Vg = vecx in mathbbZ_2^n    g cdot vecx = vecx = vecx in mathbbZ_2^n    (g pm mathbf1) cdot vecx = vec0. This means, Vg is equivalent to the kernel, ker(gpm I) (pm is equivalent in ℤ₂).\n\n\n\n\n\n","category":"method"},{"location":"conjugacy-invariants/#AntiIdClosedGroup.ord-Tuple{SparseArrays.SparseMatrixCSC{Zd_Arithmetics.ℤd{Bool, 2}, Int64}, Int64}","page":"Analysis of the conjugacy classes via invariants","title":"AntiIdClosedGroup.ord","text":"ord(g::SparseMatrixCSC{ℤ₂, Int64}, n::Int64)::Int64\n\nCalculate the order of a given element g, with g^order = identity. Only works for elements with finite order (\"order > 0\").\n\n\n\n\n\n","category":"method"},{"location":"conjugacy-invariants/#AntiIdClosedGroup.quadratic_form-Tuple{Vector{Zd_Arithmetics.ℤd{Bool, 2}}}","page":"Analysis of the conjugacy classes via invariants","title":"AntiIdClosedGroup.quadratic_form","text":"quadratic_form(x::Vector{ℤ₂})::Int8\n\nQuadratic form q mathbbZ_2^n rightarrow mathbbZ_4 vecx mapsto sum_i ( x_i mod4).\n\n\n\n\n\n","category":"method"},{"location":"conjugacy-invariants/#AntiIdClosedGroup.rank_of_power_plus_id-Tuple{Matrix{Zd_Arithmetics.ℤd{Bool, 2}}, Int64, Int64}","page":"Analysis of the conjugacy classes via invariants","title":"AntiIdClosedGroup.rank_of_power_plus_id","text":"rank_of_power_plus_id(g::Matrix{ℤ₂}, power::Int64, n)::Int64\n\nAlias for rank(g^power + id(n)).\n\n\n\n\n\n","category":"method"},{"location":"conjugacy-invariants/#AntiIdClosedGroup.tr_of_power-Tuple{SparseArrays.SparseMatrixCSC{Zd_Arithmetics.ℤd{Bool, 2}, Int64}, Int64}","page":"Analysis of the conjugacy classes via invariants","title":"AntiIdClosedGroup.tr_of_power","text":"tr_of_power(g::SparseMatrixCSC{ℤ₂, Int64}, power::Int64)::Int64\n\nAlias for the trace tr(g^power).\n\n\n\n\n\n","category":"method"},{"location":"conjugacy-invariants/#AntiIdClosedGroup.ℤ₂ⁿ-Tuple{Int64}","page":"Analysis of the conjugacy classes via invariants","title":"AntiIdClosedGroup.ℤ₂ⁿ","text":"ℤ₂ⁿ(n::Int64)::Vector{Vector{ℤ₂}}\n\nCalculate all 2^n possible vectors in mathbbZ_2^n.\n\n\n\n\n\n","category":"method"},{"location":"#AntiIdClosedGroup.jl-Documentation","page":"AntiIdClosedGroup.jl Documentation","title":"AntiIdClosedGroup.jl Documentation","text":"","category":"section"},{"location":"","page":"AntiIdClosedGroup.jl Documentation","title":"AntiIdClosedGroup.jl Documentation","text":"CurrentModule = AntiIdClosedGroup\nDocTestSetup = quote\n    using AntiIdClosedGroup\nend","category":"page"},{"location":"#Installation","page":"AntiIdClosedGroup.jl Documentation","title":"Installation","text":"","category":"section"},{"location":"","page":"AntiIdClosedGroup.jl Documentation","title":"AntiIdClosedGroup.jl Documentation","text":"] add git@github.com:Fhoeddinghaus/AntiIdClosedGroup.jl.git","category":"page"},{"location":"","page":"AntiIdClosedGroup.jl Documentation","title":"AntiIdClosedGroup.jl Documentation","text":"or ","category":"page"},{"location":"","page":"AntiIdClosedGroup.jl Documentation","title":"AntiIdClosedGroup.jl Documentation","text":"] add https://github.com/Fhoeddinghaus/AntiIdClosedGroup.jl.git","category":"page"},{"location":"#Contents","page":"AntiIdClosedGroup.jl Documentation","title":"Contents","text":"","category":"section"},{"location":"","page":"AntiIdClosedGroup.jl Documentation","title":"AntiIdClosedGroup.jl Documentation","text":"Pages = [\"index.md\", \"anti-identity.md\", \"notation.md\", \"generators.md\", \"permutations.md\", \"conjugacy-invariants.md\", \"example.md\"]\nDepth = 3","category":"page"},{"location":"#Index","page":"AntiIdClosedGroup.jl Documentation","title":"Index","text":"","category":"section"},{"location":"","page":"AntiIdClosedGroup.jl Documentation","title":"AntiIdClosedGroup.jl Documentation","text":"","category":"page"},{"location":"permutations/#Permutations","page":"Permutations","title":"Permutations","text":"","category":"section"},{"location":"permutations/","page":"Permutations","title":"Permutations","text":"CurrentModule = AntiIdClosedGroup\nDocTestSetup = quote\n    using AntiIdClosedGroup\nend","category":"page"},{"location":"permutations/","page":"Permutations","title":"Permutations","text":"Modules = [AntiIdClosedGroup]\nPages = [\"permutations.jl\"]","category":"page"},{"location":"permutations/#AntiIdClosedGroup.apply_permutation-Tuple{AbstractMatrix{T} where T, Vector{Int64}}","page":"Permutations","title":"AntiIdClosedGroup.apply_permutation","text":"apply_permutation(A::AbstractMatrix, p::Vector{Int64})::AbstractMatrix\n\nApplies a given permutation-vector p to the given matrix A using the corresponding permutation-matrices.\n\n\n\n\n\n","category":"method"},{"location":"permutations/#AntiIdClosedGroup.perm_cols-Tuple{AbstractMatrix{T} where T, Vector{Int64}}","page":"Permutations","title":"AntiIdClosedGroup.perm_cols","text":"perm_cols(A::AbstractMatrix, p::Vector{Int64})::AbstractMatrix\n\nApply a permutation to the columns of a given Matrix. Used to create corresponding inverse permutation matrices with A = identity.\n\n\n\n\n\n","category":"method"},{"location":"permutations/#AntiIdClosedGroup.perm_rows-Tuple{AbstractMatrix{T} where T, Vector{Int64}}","page":"Permutations","title":"AntiIdClosedGroup.perm_rows","text":"perm_rows(A::AbstractMatrix, p::Vector{Int64})::AbstractMatrix\n\nApply a permutation to the rows of a given Matrix. Used to create corresponding permutation matrices with A = identity.\n\n\n\n\n\n","category":"method"},{"location":"permutations/#AntiIdClosedGroup.print_permutation_cycles-Union{Tuple{T}, Tuple{Bijections.Bijection{String, T}, Vector{Vector{Int64}}, String}} where T","page":"Permutations","title":"AntiIdClosedGroup.print_permutation_cycles","text":"print_permutation_cycles(labelled_list::Bijection{String, T}, permutations::Vector{Vector{Int64}}, filename_identifier::String; filename_prefix=\"permutation_cycles_\") where T\n\nApplies all given permutations to all given labelled elements and prints out the permutation cycles using the labels.  The output is redirected and appended to a file filename_prefix * filename_identifier * \".txt\", e.g. \"permutation_cycles_1.txt\"\n\n\n\n\n\n","category":"method"},{"location":"anti-identity/#(Anti-)-Identity","page":"(Anti-) Identity","title":"(Anti-) Identity","text":"","category":"section"},{"location":"anti-identity/","page":"(Anti-) Identity","title":"(Anti-) Identity","text":"CurrentModule = AntiIdClosedGroup\nDocTestSetup = quote\n    using AntiIdClosedGroup\nend","category":"page"},{"location":"anti-identity/#The-identity","page":"(Anti-) Identity","title":"The identity","text":"","category":"section"},{"location":"anti-identity/","page":"(Anti-) Identity","title":"(Anti-) Identity","text":"id(k::Int64)","category":"page"},{"location":"anti-identity/#AntiIdClosedGroup.id-Tuple{Int64}","page":"(Anti-) Identity","title":"AntiIdClosedGroup.id","text":"id(k::Int64) -> SparseMatrixCSC{ℤ₂, Int64}\n\nGenerate and return a k × k identity-matrix.\n\n\n\n\n\n","category":"method"},{"location":"anti-identity/#The-Anti-Identity","page":"(Anti-) Identity","title":"The Anti-Identity","text":"","category":"section"},{"location":"anti-identity/","page":"(Anti-) Identity","title":"(Anti-) Identity","text":"anti_id(k::Int64)","category":"page"},{"location":"anti-identity/#AntiIdClosedGroup.anti_id-Tuple{Int64}","page":"(Anti-) Identity","title":"AntiIdClosedGroup.anti_id","text":"anti_id(k::Int64) -> SparseMatrixCSC{ℤ₂, Int64}\n\nGenerate and return a k × k anti-identity-matrix.\n\n\n\n\n\n","category":"method"}]
}
