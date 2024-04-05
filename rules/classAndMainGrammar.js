// A.1 Class and Main Grammar Elements

module.exports = {
  stored_definitions: $ => seq(
    optional(field("withinClause", seq($.within_clause, ";"))),
    optional(field("classDefinitionList", $.class_definition_list))
  ),

  within_clause: $ => seq(
    field("within", "within"),
    optional(field("namePath", $.name_path))
  ),

  class_definition_list: $ => repeat1(
    seq(
      optional(field("final", "final")),
      field("classDefinition", $.class_definition),
      ";"
    )
  ),

  class_definition: $ => seq(
    optional(field("encapsulated", "encapsulated")),
    optional(field("partial", "partial")),
    field("classType", $.class_type),
    field("classSpecifier", $.class_specifier)
  ),

  class_type: $ => choice(
    field("class", "class"),
    field("optimization", "optimization"),
    field("model", "model"),
    field("record", "record"),
    field("block", "block"),
    seq(
      optional("expandable"),
      field("connector", "connector")
    ),
    field("type", "type"),
    field("package", "package"),
    field("function", "function"),
    field("uniontype", "uniontype"),
    seq(
      field("operator", "operator"),
      optional(choice("function", "record"))
    )
  ),

  identifier: $ => choice(
    $.IDENT,
    //$.DER,
    //$.CODE,
    //$.EQUALITY,
    //$.INITIAL
  ),

  name_path: $ => "TODO",
  class_specifier: $ => "TODO"
};
