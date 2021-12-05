# Usage by Example

!!! info
    You can find a [notebook version](https://github.com/Fhoeddinghaus/AntiIdClosedGroup.jl/blob/main/docs/example.ipynb) of this example in the repository.

```@meta
CurrentModule = AntiIdClosedGroup
DocTestSetup = quote
    using AntiIdClosedGroup
end
```


This package directly depends on
- [ClosedGroupFunctions.jl](https://github.com/fhoeddinghaus/ClosedGroupFunctions.jl.git)
- [Zd_Arithmetics.jl](https://github.com/fhoeddinghaus/Zd_Arithmetics.jl.git)

## Install the Package

    ] add git@github.com:Fhoeddinghaus/AntiIdClosedGroup.jl.git

or

    ] add https://github.com/Fhoeddinghaus/AntiIdClosedGroup.jl.git

## Load the Package
```julia
using ClosedGroupFunctions
using Zd_Arithmetics

import Zd_Arithmetics: ℤ₂

# for developement, load the local package (see docs/example.ipynb)
#push!(LOAD_PATH,"../src/")
using AntiIdClosedGroup
```

## Generating the group
### Defining the parameters

```julia
n = 5 # size of the outer matrix
k = 4 # size of the anti-identity sub-block
```

### The standard generators
Constructing the generators as described in the original thesis using [`construct_generators`](@ref).

```julia
Ω, all_pos, all_generators = construct_generators(n,k);
```

#### Outputting the generators as LaTeX

The generators can be converted to LaTeX-code if needed using [`po2matrix`](@ref) or [`all_pos2latex`](@ref).


### Generating the groups using the `ClosedGroupFunctions.jl`-Package

```julia
group, num_all_multiplications = group_generator_basic(all_generators; prnt=false, commutes=false);
```

It's not necessary to use the standard generators, as the `group_generator_basic` takes all kind of elements. Someone may try smaller sets of generators, as seen below (permutations).

It's advised to save the calculated group to disk for later use by using `ClosedGroupFunctions.jl`'s `store_group(...)` and `load_group(...)` functions.

```julia
# store the group to disk
store_group("n$n" * "k$k", group)

# load the group from disk
group = load_group("n$n" * "k$k");
```

#### Labelling the group

```julia
# label the generators
all_generators_labelled = label_generators(all_generators);

# label the group with the fast method
#number_of_elements = length(group)
#labelled_group = labelled_group_generator_simple(all_generators_labelled, number_of_elements; commutes=false);

# or label the group with the shortest possible label (slower method)
labelled_group = labelled_group_generator_shortest(all_generators_labelled; prnt=false, commutes=false)[1];
```

See [`ClosedGroupFunctions.jl` Documentation](https://fhoeddinghaus.github.io/ClosedGroupFunctions.jl/).

```julia
# it's advised to store the labelled group for future use
store_group("n$n" * "k$k", labelled_group; filename_prefix="closed_group_labelled_")

# load the labelled group from disk
labelled_group = load_group("n$n" * "k$k"; filename_prefix="closed_group_labelled_");
```

## Investigation and Analysis

We now want to investigate the group and it's generators further.

### Permutations

To investigate the group/generators under permutations, we first have to label the elements like above and then calculate all possible permutations.

```julia
all_generators_labelled = label_generators(all_generators);
```

```julia
# all permutations of [1, 2, 3, 4, 5, 6, 7] can be found with Combinatorics.jl
# either by
# using Combinatorics
# collect(permutations(1:n))
# or without importing (AntiIdClosedGroup depends directly on Combinatorics.jl)
all_permutations = collect(AntiIdClosedGroup.permutations(1:n));
```

Now we can apply the permutations (or just some of them) to the labelled generators by using the following function. The output is redirected and **appended** into a file with a given prefix (`"permutation_cycles_"`) and the identifier (`"tmp_1"`), because it's quite big. See [`print_permutation_cycles`](@ref).

```julia
print_permutation_cycles(all_generators_labelled, all_permutations, "n$n" * "k$k")
```

After some analysis of the file, we find a list of permutations, that can construct the other generators from each other. In the outputted file, `p[i]` corresponds to the `i`th permutation in the entered list, `all_permutations`.

The result can now be used to construct a new, smaller set of generators.

```julia
# in this case, only one permutation is needed to calculate all other generators from one of them.
selected_permutations = [97] # list of selected permutations
ps = all_permutations[selected_permutations]

Pₛ = [perm_rows(id(n), ps[i]) for i in 1:length(ps)]
Qₛ = [perm_cols(id(n), ps[i]) for i in 1:length(ps)] # Q = P_inv

# new set of generators
a = all_generators[1]
new_generators = [a, Pₛ..., Qₛ...];
```

See [`perm_rows`](@ref) and [`perm_cols`](@ref).

#### Calculate the group with the new generators
```julia
group_with_perms, num_all_multiplications_with_perms = group_generator_basic(new_generators; prnt=false, commutes=false);


# As explained in the thesis results, the group stays the same under permutations, 
# because all possible permutations are already part of the group.
# This is therefore a method to possibly find a smaller set of generators.
group == group_with_perms
```


### Invariants and Conjugacy Classes

#### Calculating the conjugacy classes

We first calculate the conjugacy classes of the given group using `calculate_conjugacy_classes` from `ClosedGroupFunctions.jl`. Note that this package implements a type dispatched version of [`Base.inv`](@ref) that itself uses the implementation of `inv` in `Zd_Arithmetics.jl`. Therefore, the default `inverse=inv` can be used here.

```julia
conjugacy_classes = calculate_conjugacy_classes(labelled_group);

println("\nThere were $(length(conjugacy_classes)) different conjugacy classes found.")
```

```julia
# it's advised to store the conjugacy classes for later usage
store_group("n$n" * "k$k", conjugacy_classes; filename_prefix="conjugacy_classes_")

conjugacy_classes = load_group("n$n" * "k$k"; filename_prefix="conjugacy_classes_");
```

#### Invariants
The package provides a few invariants that can be used:

1. Order of an element: [`ord`](@ref)`(g, n)`
2. Trace of an element (with higher powers): [`tr_of_power`](@ref)`(g, power) = tr(g^power)`
3. Rank of an element (+ Id): [`rank_of_power_plus_id`](@ref)`(g, power, n) = rank(g^power + id(n))`
4. Generalized Arf invariant of an element: [`generalized_arf`](@ref)`(g, n; readable = true)`

To use this functions for investigation of the conjugacy classes, we can use the functions `apply_invariant_to_first_in_class(...)` or `apply_invariant_to_first_in_all_classes(...)` from the `ClosedGroupFunctions.jl` package.

Both of these functions expect an `invariant` with exactly one argument: the element `g`. Therefore we have to define wrappers for the invariants, that we want to look at.

```julia
prnt = false;
```

```julia
# 1. order
order(g) = ord(g,n)
order_values = apply_invariant_to_first_in_all_classes(conjugacy_classes, labelled_group, order; prnt=prnt);
```

```julia
# 2. trace
# 2.1 power = 1
tr¹(g) = tr_of_power(g, 1)
tr¹_values = apply_invariant_to_first_in_all_classes(conjugacy_classes, labelled_group, tr¹; prnt=prnt);
println("")

# 2.2 power = 2
tr²(g) = tr_of_power(g, 2)
tr²_values = apply_invariant_to_first_in_all_classes(conjugacy_classes, labelled_group, tr²; prnt=prnt);

# ... maybe higher powers
```

```julia
# 3. rank
# 3.1 rank(g^1 + I)
rank¹(g) = rank_of_power_plus_id(Matrix(g), 1, n) # sometimes a wrapping of g with Matrix(g) is needed
rank¹_values = apply_invariant_to_first_in_all_classes(conjugacy_classes, labelled_group, rank¹; prnt=prnt);
println("")

# 3.2 rank(g^2 + I)
rank²(g) = rank_of_power_plus_id(Matrix(g), 2, n)
rank²_values = apply_invariant_to_first_in_all_classes(conjugacy_classes, labelled_group, rank²; prnt=prnt);

# ... maybe higher powers
```

```julia
# 4. GArf
garf(g) = generalized_arf(g, n; readable=true)
garf_values = apply_invariant_to_first_in_all_classes(conjugacy_classes, labelled_group, garf; prnt=prnt);
```

The `*_values` arrays now contain all values that are invariant for the conjugacy class with the same index as the value.

#### Pretty output of the values using a HTML table

Just for completeness, here is a 'pretty' way of printing all values.

```julia
# list of invariants (columns) to print out in the form of label => values
column_keys = ["# of elements in Cl(x)", "ord(g)", "tr(g^1)", "tr(g^2)", "rank(g^1 + 1)", "rank(g^2 + 1)", "GArf [radian, °]"]
columns = Dict([
        "# of elements in Cl(x)" => length.(conjugacy_classes),
        "ord(g)" => order_values,
        "tr(g^1)" => tr¹_values,
        "tr(g^2)" => tr²_values,
        "rank(g^1 + 1)" => rank¹_values,
        "rank(g^2 + 1)" => rank²_values,
        "GArf [radian, °]" => garf_values
        ])

HTML() do io
    println(io, "<table><thead>
            <tr>
                <td>Conjugacy Class No.</td>
                <td>x for Cl(x)</td>")
    for l in column_keys
        println(io, "<td>" * l * "</td>")
    end
    println(io, "
                
            </tr>
        </thead><tbody>")
    for i in 1:length(conjugacy_classes)
        println(io, "<tr><td>$i</td><td>" * sort(collect(conjugacy_classes[i]))[1] * "</td>")
        for l in column_keys
             println(io, "<td>$(columns[l][i])</td>")
        end
        println(io, "</tr>")
    end
    
    println(io, "</tbody></table>")
end
```



For the example stated above (`n=5, k=4`):

|Conjugacy Class No.|x for Cl(x)|# of elements in Cl(x)|ord(g)|tr(g^1)|tr(g^2)|rank(g^1 + 1)|rank(g^2 + 1)|GArf [radian, °]|
|--- |--- |--- |--- |--- |--- |--- |--- |--- |
|1|a|15|2|1|1|1|0|("0.0π", "0.0°")|
|2|ab|40|3|0|0|3|3|("-0.75π", "-135.0°")|
|3|abc|90|4|1|1|3|2|("0.25π", "45.0°")|
|4|abcd|144|5|0|0|5|5|("0.25π", "45.0°")|
|5|abcde|120|6|1|1|4|5|("0.25π", "45.0°")|
|6|abcecd|90|4|1|1|3|2|("0.0π", "0.0°")|
|7|abdcdea|120|6|0|0|4|3|("0.25π", "45.0°")|
|8|abdebc|40|3|1|1|5|5|("0.25π", "45.0°")|
|9|abeb|45|2|1|1|2|0|("0.0π", "0.0°")|
|10|aedbcbe|15|2|1|1|2|0|("0.0π", "0.0°")|
|11|cc|1|1|1|1|0|0|("-0.75π", "-135.0°")|
