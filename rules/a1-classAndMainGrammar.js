/*
 * This file is part of OpenModelica.
 *
 * Copyright (c) 1998-2024, Open Source Modelica Consortium (OSMC),
 * c/o Linköpings universitet, Department of Computer and Information Science,
 * SE-58183 Linköping, Sweden.
 *
 * All rights reserved.
 *
 * THIS PROGRAM IS PROVIDED UNDER THE TERMS OF AGPL VERSION 3 LICENSE OR
 * THIS OSMC PUBLIC LICENSE (OSMC-PL) VERSION 1.8.
 * ANY USE, REPRODUCTION OR DISTRIBUTION OF THIS PROGRAM CONSTITUTES
 * RECIPIENT'S ACCEPTANCE OF THE OSMC PUBLIC LICENSE OR THE GNU AGPL
 * VERSION 3, ACCORDING TO RECIPIENTS CHOICE.
 *
 * The OpenModelica software and the OSMC (Open Source Modelica Consortium)
 * Public License (OSMC-PL) are obtained from OSMC, either from the above
 * address, from the URLs:
 * http://www.openmodelica.org or
 * https://github.com/OpenModelica/ or
 * http://www.ida.liu.se/projects/OpenModelica,
 * and in the OpenModelica distribution.
 *
 * GNU AGPL version 3 is obtained from:
 * https://www.gnu.org/licenses/licenses.html#GPL
 *
 * This program is distributed WITHOUT ANY WARRANTY; without
 * even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE, EXCEPT AS EXPRESSLY SET FORTH
 * IN THE BY RECIPIENT SELECTED SUBSIDIARY LICENSE CONDITIONS OF OSMC-PL.
 *
 * See the full OSMC Public License conditions for more details.
 *
 */

// A.1 Class and Main Grammar Elements
//
// From Towards Modelica 4 Meta-Programming and Language Modeling with MetaModelica 2.0
// Appendix A, section A.1 Class and Main Grammar Elements
// https://liu.diva-portal.org/smash/record.jsf?pid=diva2%3A418188&dswid=-9758

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
    $.DER,
    $.CODE,
    $.EQUALITY,
    $.INITIAL
  ),

  class_specifier: $ => choice(
    seq(
      field("identifier", $.identifier),
      $.class_specifier2
    ),
    seq(
      "extends",
      field("identifier", $.identifier),
      optional(field("classModification", $.class_modification)),
      field("comment", $.string_comment),
      field("composition", $.composition),
      "end",
      field("endIdentifier", $.identifier)
    )
  ),

  class_specifier2: $ => choice(
    seq(
      optional(
        field("identList",
          seq(
          "<",
          $.ident_list,
          ">"
          )
        )
      ),
      field("comment", $.string_comment),
      field("composition", $.composition),
      "end",
      field("endIdentifier", $.identifier)
    ),
    seq(
      "=",
      field("basePrefix", $.base_prefix),
      field("typeSpecifier", $.type_specifier),
      optional(
        field("classModifier", $.class_modification)
      ),
      field("comment", $.comment)
    ),
    seq(
      "=",
      field("enumeration", $.enumeration)
    ),
    seq(
      "=",
      field("pder", $.pder)
    ),
    seq(
      "=",
      field("overloading", $.overloading)
    )
  ),

  pder: $ => seq(
    $.DER,
    "(",
    field("namePath", $.name_path),
    ",",
    $.ident_list,
    ")",
    field("comment", $.comment)
  ),

  ident_list: $ => seq(
    field("ident", $.IDENT),
    repeat(seq(
      ",",
      field("ident", $.IDENT)
    ))
  ),

  overloading: $ => seq(
    "overload",
    "(",
    $.name_list,
    ")",
    field("comment", $.comment)
  ),

  base_prefix: $ => $.type_prefix,

  name_list: $ => seq(
    field("namePath", $.name_path),
    repeat(seq(
      ",",
      field("namePath", $.name_path),
    ))
  ),

  enumeration: $ => seq(
    "enumeration",
    "(",
    choice(
      $.enum_list,
      ":"
    ),
    ")",
    field("comment", $.comment)
  ),

  enum_list: $ => seq(
    field("enumerationLiteral", $.enumeration_literal),
    repeat(seq(
      ",",
      field("enumerationLiteral", $.enumeration_literal),
    ))
  ),

  enumeration_literal: $ => seq(
    $.IDENT,
    field("comment", $.comment)
  ),

  composition: $ => seq(
    $.element_list, // TODO: can be empty?
    // composition2
    optional(repeat(
      choice(
        $.public_element_list,
        $.protected_element_list,
        $.initial_equation_clause,
        $.initial_algorithm_clause,
        $.equation_clause,
        $.constraint_clause,
        $.algorithm_clause,
      )
    )),
    optional($.external_clause)
  ),

  // TODO: composition2 can be empty rule
  // TODO: how to do the recursive part?

  external_clause: $ => seq(
    "external",
    optional(field("languageSpecification", $.language_specification)),
    optional(
      seq(
        optional(seq(
          field("componentReference", $.component_reference),
          "="
        )),
        $.IDENT,
        "(",
        optional($.expression_list),
        ")"
      )
    ),
    optional("annotation"),
    ";",
    optional(field("externalAnnotation", $.external_annotation))
  ),

  external_annotation: $ => seq(
    field("externalAnnotation", $.annotation),
    ";"
  ),

  public_element_list: $ => seq(
    "public",
    optional($.element_list1)
  ),

  protected_element_list: $ => seq(
    "protected",
    optional($.element_list1)
  ),

  language_specification: $ => seq(
    $.STRING,
    ";"
  ),

  // element_list could be empty
  element_list1: $ => repeat1(
    seq(
      choice(
        field("element", $.element),
        field("annotation", $.annotation)
      ),
      ";"
    )
  ),

  element: $ => choice(
    field("importClause", $.importClause),
    field("extendsClause", $.extendsClause),
    seq(
      optional("redeclare"),
      optional("final"),
      optional("inner"),
      optional("outer"),
      choice(
        choice(
          field("classDefinition", $.class_definition),
          field("componentClause", $.component_clause)
        ),
        seq(
          "replaceable",
          choice(
            field("classDefinition", $.class_definition),
            field("componentClause", $.component_clause)
          ),
          optional(field("constrainingClauseComment", $.constraining_clause_comment))
        )
      )
    )
  ),

  import_clause: $ => seq(
    "import",
    choice(
      field("explicitImportName", $.explicit_import_name),
      field("implicitImportName", $.implicit_import_name)
    ),
    field("comment", $.comment)
  ),

  explicit_import_name: $ => seq(
    choice(
      $.IDENT,
      $.CODE
    ),
    "=",
    field("namePath", $.name_path)
  ),

  implicit_import_name: $ => $.name_path_star
};
