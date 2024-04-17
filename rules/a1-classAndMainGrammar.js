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
  stored_definition: $ => seq(
    optional(
      field("withinClause",
        seq(
          $.within_clause,
          $._SEMICOLON
        )
      )
    ),
    field("classDefinitionList", repeat($._class_definition_list))
  ),

  within_clause: $ => seq(
    field("within", $.WITHIN),
    optional(field("namePath", $.name_path))
  ),

  // TODO: Or use left?
  _class_definition_list: $ => seq(
    optional(field("final", $.FINAL)),
    field("classDefinition", $.class_definition),
    $._SEMICOLON,
  ),

  class_definition: $ => seq(
    optional(field("encapsulated", $.ENCAPSULATED)),
    optional(field("partial", $.PARTIAL)),
    field("classType", $.class_type),
    field("classSpecifier", $.class_specifier)
  ),

  class_type: $ => choice(
    field("class", $.CLASS),
    field("optimization", $.OPTIMIZATION),
    field("model", $.MODEL),
    field("record", $.RECORD),
    field("block", $.BLOCK),
    seq(
      optional($.EXPANDABLE),
      field("connector", $.CONNECTOR)
    ),
    field("type", $.TYPE),
    field("package", $.PACKAGE),
    seq(
      optional(choice(
        $.PURE,
        $.IMPURE
      )),
      //optional(choice(
      //  $.OPERATOR,
      //  $.T_PARALLEL,
      //  $.T_KERNEL
      //)),
      field("function", $.FUNCTION),
    ),
    field("uniontype", $.UNIONTYPE),
    seq(
      field("operator", $.OPERATOR),
      optional(choice($.FUNCTION, $.RECORD))
    )
  ),

  // TODO: What is DER, CODE, EQUALITY, INITIAL?
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
      $._class_specifier2
    ),
    seq(
      $.EXTENDS,
      field("identifier", $.identifier),
      optional(field("classModification", $.class_modification)),
      field("comment", optional($.string_comment)),
      field("composition", optional($.composition)),
      $.T_END,
      field("endIdentifier", $.identifier)
    )
  ),

  _class_specifier2: $ => choice(
    seq(
      optional(
        field("identList",
          seq(
          $.LESS,
          $._ident_list,
          $.GREATER,
          )
        )
      ),
      field("comment", optional($.string_comment)),
      field("composition", optional($.composition)),
      $.T_END,
      field("endIdentifier", $.identifier)
    ),
    seq(
      $.EQUALS,
      field("basePrefix", optional(alias($.type_prefix, $.base_prefix))),
      field("typeSpecifier", $.type_specifier),
      optional(
        field("classModifier", $.class_modification)
      ),
      field("comment", optional($.comment))
    ),
    seq(
      $.EQUALS,
      field("enumeration", $.enumeration)
    ),
    seq(
      $.EQUALS,
      field("pder", $.pder)
    ),
    seq(
      $.EQUALS,
      field("overloading", $.overloading)
    ),
    seq(
      $.SUBTYPEOF,
      $.type_specifier
    )
  ),

  pder: $ => seq(
    $.DER,
    $.LPAR,
    field("namePath", $.name_path),
    $.COMMA,
    $._ident_list,
    $.RPAR,
    field("comment", optional($.comment))
  ),

  _ident_list: $ => seq(
    field("ident", $.IDENT),
    repeat(seq(
      $.COMMA,
      field("ident", $.IDENT)
    ))
  ),

  overloading: $ => seq(
    $.OVERLOAD,
    $.LPAR,
    $._name_list,
    $.RPAR,
    field("comment", optional($.comment))
  ),

  //base_prefix: $ => $.type_prefix,

  _name_list: $ => seq(
    field("namePath", $.name_path),
    repeat(seq(
      $.COMMA,
      field("namePath", $.name_path),
    ))
  ),

  enumeration: $ => seq(
    $.ENUMERATION,
    $.LPAR,
    choice(
      $._enum_list,
      $.COLON
    ),
    $.RPAR,
    field("comment", optional($.comment))
  ),

  _enum_list: $ => seq(
    field("enumerationLiteral", $.enumeration_literal),
    repeat(seq(
      $.COMMA,
      field("enumerationLiteral", $.enumeration_literal),
    ))
  ),

  enumeration_literal: $ => seq(
    $.IDENT,
    field("comment", optional($.comment))
  ),

  composition: $ => choice(
    seq(
      repeat1($._element_list),
      optional($._composition2)
    ),
    seq(
      repeat($._element_list),
      $._composition2
    )
  ),

  _composition2: $ => choice(
    seq(
      repeat1(
        choice(
          $._public_element_list,
          $._protected_element_list,
          $.initial_equation_clause,
          $.initial_algorithm_clause,
          $.equation_clause,
          $.constraint_clause,
          $.algorithm_clause,
        )
      ),
      $.external_clause
    ),
    repeat1(
      choice(
        $._public_element_list,
        $._protected_element_list,
        $.initial_equation_clause,
        $.initial_algorithm_clause,
        $.equation_clause,
        $.constraint_clause,
        $.algorithm_clause
      )
    ),
    $.external_clause
  ),

  external_clause: $ => seq(
    $.EXTERNAL,
    optional(field("languageSpecification", $.language_specification)),
    optional(
      seq(
        optional(seq(
          field("componentReference", $.component_reference),
          $.EQUALS
        )),
        field("functionName", $.IDENT),
        $.LPAR,
        optional($._expression_list),
        $.RPAR
      )
    ),
    optional($.annotation),
    $._SEMICOLON,
    optional(field("externalAnnotation", $.external_annotation))
  ),

  external_annotation: $ => seq(
    field("externalAnnotation", $.annotation),
    $._SEMICOLON
  ),

  _public_element_list: $ => seq(
    $.PUBLIC,
    repeat($._element_list)
  ),

  _protected_element_list: $ => seq(
    $.PROTECTED,
    repeat($._element_list)
  ),

  language_specification: $ => seq(
    $.STRING
  ),

  // _element_list could be empty list, use repeat(_element_list) everywhere
  _element_list: $ => seq(
    choice(
      field("element", $.element),
      field("annotation", $.annotation)
    ),
    $._SEMICOLON
  ),

  element: $ => choice(
    field("importClause", $.import_clause),
    field("extendsClause", $.extends_clause),
    seq(
      optional($.REDECLARE),
      optional($.FINAL),
      optional($.INNER),
      optional($.T_OUTER),
      choice(
        choice(
          field("classDefinition", $.class_definition),
          field("componentClause", $.component_clause)
        ),
        seq(
          $.REPLACEABLE,
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
    $.IMPORT,
    choice(
      field("explicitImportName", $.explicit_import_name),
      field("implicitImportName", $.implicit_import_name)
    ),
    field("comment", optional($.comment))
  ),

  // TODO: What is CODE?
  explicit_import_name: $ => seq(
    choice(
      $.IDENT,
      $.CODE
    ),
    $.EQUALS,
    field("namePath", $.name_path)
  ),

  implicit_import_name: $ => field("namePathStar", $.name_path_star)
};
