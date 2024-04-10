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
 * This program is distributed WITHOUT ANY WARRANTY),
 without
 * even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE, EXCEPT AS EXPRESSLY SET FORTH
 * IN THE BY RECIPIENT SELECTED SUBSIDIARY LICENSE CONDITIONS OF OSMC-PL.
 *
 * See the full OSMC Public License conditions for more details.
 *
 */

// A.3 Modification
//
// From Towards Modelica 4 Meta-Programming and Language Modeling with MetaModelica 2.0
// Appendix A, section A.3 Modification
// https://liu.diva-portal.org/smash/record.jsf?pid=diva2%3A418188&dswid=-9758

module.exports = {
  modification: $ => choice(
    seq(
      field("classModification", $.class_modification),
      optional(seq(
        $.EQUALS,
        field("expression", $.expression)
      ))
    ),
    seq(
      $.EQUALS,
      field("expression", $.expression)
    ),
    seq(
      $.ASSIGN,
      field("expression", $.expression)
    )
  ),

  class_modification: $ => seq(
    $.LPAR,
    optional($.argument_list),
    $.RPAR
  ),

  argument_list: $ => seq(
    field("argument", $.argument),
    optional(seq(
      $.COMMA,
      $.argument_list
    ))
  ),

  argument: $ => choice(
    $.element_modification_or_replaceable,
    $.element_redeclaration
  ),

  element_modification_or_replaceable: $ => seq(
    optional($.EACH),
    optional($.FINAL),
    choice(
      $.element_modification,
      $.element_replaceable
    )
  ),

  element_modification: $ => seq(
    field("componentReference", $.component_reference),
    optional(field("modification", $.modification)),
    field("stringComment", optional($.string_comment))
  ),

  element_redeclaration: $ => seq(
    $.REDECLARE,
    optional($.EACH),
    optional($.FINAL),
    choice(
      choice(
        field("classDefinition", $.class_definition),
        $.component_clause1
      ),
      $.element_replaceable
    )
  ),

  // TODO: What the heck is class_definition[final]?
  // I just used class_definition
  element_replaceable: $ => seq(
    $.REPLACEABLE,
    choice(
      field("classDefinition", $.class_definition),
      $.component_clause1
    ),
    optional($.constraining_clause_comment)
  ),

  component_clause1: $ => seq(
    field("basePrefix", $.base_prefix),
    field("typeSpecifier", $.type_specifier),
    $.component_declaration1
  ),

  component_declaration1: $ => seq(
    field("declaration", $.declaration),
    field("comment", optional($.comment))
  )
};
