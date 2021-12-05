# Notation Converters

There are some helper functions that can handle and produce the `AI`- and `PO`-notation as used in the original thesis.
The `AI`-notation only lists the row/column indices that contain the anti-identity, the `PO`-notation lists only the indices of the 'padding-ones'.

```@meta
CurrentModule = AntiIdClosedGroup
DocTestSetup = quote
    using AntiIdClosedGroup
end
```

```@autodocs
Modules = [AntiIdClosedGroup]
Pages = ["notation_converters.jl"]
```