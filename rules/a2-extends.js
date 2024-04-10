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

// A.2 Extends
//
// From Towards Modelica 4 Meta-Programming and Language Modeling with MetaModelica 2.0
// Appendix A, section A.2 Extends
// https://liu.diva-portal.org/smash/record.jsf?pid=diva2%3A418188&dswid=-9758

module.exports = {

  // Extends
  extends_clause: $ => seq(
    $.EXTENDS,
    field("namePath", $.name_path),
    optional(field("classModification", $.class_modification)),
    optional(field("annotation", $.annotation))
  ),

  constraining_clause_comment: $ => seq(
    field("constrainingClause", $.constraining_clause),
    field("comment", $.comment)
  ),

  constraining_clause: $ => choice(
    seq(
      $.EXTENDS,
      field("namePath", $.name_path),
      optional(field("classModification", $.class_modification))
    ),
    seq(
      $.CONSTRAINEDBY,
      field("namePath", $.name_path),
      optional(field("classModification", $.class_modification))
    )
  ),

  // Component clause
  component_clause: $ => seq(
    field("typePrefix", $.type_prefix),
    field("typeSpecifier", $.type_specifier),
    $.component_list,
  ),

  type_prefix: $ => seq(
    choice(
      $.FLOW,
      $.STREAM
    ),
    choice(
      $.DISCRETE,
      $.PARAMETER,
      $.CONSTANT
    ),
    choice(
      $.T_INPUT,
      $.T_OUTPUT
    )
  ),

  type_specifier: $ => seq(
    field("namePath", $.name_path),
    optional(seq(
      $.LESS,
      $.type_specifier_list,
      $.GREATER
    )),
    optional($.array_subscripts)
  ),

  type_specifier_list: $ => seq(
    field("typeSpecifier", $.type_specifier),
    optional(seq(
      $.COMMA,
      $.type_specifier_list
    ))
  ),

  component_list: $ => seq(
    field("componentDeclaration", $.component_declaration),
    optional(seq(
      $.COMMA,
      $.component_list
    ))
  ),

  component_declaration: $ => seq(
    field("declaration", $.declaration),
    optional(field("conditionalAttribute", $.conditional_attribute)),
    field("comment", $.comment)
  ),

  conditional_attribute: $ => seq(
    $.IF,
    field("expression", $.expression)
  ),

  declaration: $ => seq(
    choice(
      $.IDENT,
      $.OPERATOR
    ),
    optional($.array_subscripts),
    optional(field("modification", $.modification))
  )
};
