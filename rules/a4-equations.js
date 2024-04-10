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

// A.4 Equations
//
// From Towards Modelica 4 Meta-Programming and Language Modeling with MetaModelica 2.0
// Appendix A, section A.4 Equations
// https://liu.diva-portal.org/smash/record.jsf?pid=diva2%3A418188&dswid=-9758

module.exports = {

  // TODO: What the heck is `{ ... }?` ?
  // I'm just removing it
  initial_equation_clause: $ => seq(
    $.INITIAL,
    $.EQUATION,
    repeat($.equation_annotation_list)
  ),

  equation_clause: $ => seq(
    $.EQUATION,
    repeat($.equation_annotation_list)
  ),

  constraint_clause: $ => seq(
    $.CONSTRAINT,
    repeat($.constraint_annotation_list)
  ),

  // TODO: What the heck is `{ ... }?` ?
  equation_annotation_list: $ => choice(
    seq(
      $.equation,
      $.SEMICOLON
    ),
    seq(
      $.annotation,
      $.SEMICOLON
    )
  ),

  // TODO: What the heck is `{ ... }?` ?
  constraint_annotation_list: $ => choice(
    seq(
      $.equation,
      $.SEMICOLON
    ),
    seq(
      $.annotation,
      $.SEMICOLON
    )
  ),

  algorithm_clause: $ => seq(
    $.T_ALGORITHM,
    repeat($.algorithm_annotation_list)
  ),

  // TODO: What the heck is `{ ... }?` ?
  initial_algorithm_clause: $ => seq(
    $.INITIAL,
    $.T_ALGORITHM,
    repeat($.algorithm_annotation_list)
  ),

  // TODO: What the heck is `{ ... }?` ?
  algorithm_annotation_list: $ => choice(
    seq(
      $.algorithm,
      $.SEMICOLON
    ),
    seq(
      $.annotation,
      $.SEMICOLON
    )
  ),

  // TODO: Recursive equation
  equation: $ => seq(
    choice(
      $.equality_or_noretcall_equation,
      $.conditional_equation_e,
      $.for_clause_e,
      $.connect_clause,
      $.when_clause_e,
      seq(
        $.FAILURE,
        $.LPAR,
        field("equation", $.equation),
        $.RPAR
      ),
      seq(
        $.EQUALITY,
        $.LPAR,
        field("leftExpression", $.expression),
        $.EQUALS,
        field("rightExpression", $.expression),
        $.RPAR
      )
    ),
    $.comment
  ),

  constraint: $ => seq(
    choice(
      $.equality_or_noretcall_equation,
      $.conditional_equation_e,
      $.for_clause_e,
      $.connect_clause,
      $.when_clause_e,
      seq(
        $.FAILURE,
        $.LPAR,
        $.equation,
        $.RPAR
      ),
      seq(
        $.EQUALITY,
        $.LPAR,
        $.expression,
        $.EQUALS,
        $.expression,
        $.RPAR
      )
    ),
    $.comment
  ),

  algorithm: $ => seq(
    choice(
      $.assign_clause_a,
      $.conditional_equation_a,
      $.for_clause_a,
      $.while_clause,
      $.when_clause_a,
      $.BREAK,
      $.RETURN,
      seq(
        $.FAILURE,
        $.LPAR,
        $.algorithm,
        $.RPAR
      ),
      seq(
        $.EQUALITY,
        $.LPAR,
        $.expression,
        $.ASSIGN,
        $.expression,
        $.RPAR
      )
    ),
    $.comment
  ),

  // TODO: What should `( ASSIGN | eq = EQUALS )` mean?
  assign_clause_a: $ => seq(
    $.simple_expression,
    optional(
      seq(
        choice(
          $.ASSIGN,
          $.EQUALS
        ),
      $.expression
    ))
  ),

  // TODO: What the heck is `{ ... }?` ?
  equality_or_noretcall_equation: $ => seq(
    $.simple_expression,
    choice(
      $.EQUALS,
      $.ASSIGN
    ),
    $.expression
  ),

  conditional_equation_e: $ => seq(
    $.IF,
    $.expression,
    $.THEN,
    $.equation_list,
    optional($.equation_elseif_list),
    optional(seq(
      $.ELSE,
      $.equation_list
    )),
    $.T_END,
    $.IF
  ),

  conditional_equation_a: $ => seq(
    $.IF,
    $.expression,
    $.THEN,
    $.algorithm_list,
    optional($.algorithm_elseif_list),
    optional(seq(
      $.ELSE,
      $.algorithm_list
    )),
    $.T_END,
    $.IF
  ),

  for_clause_e: $ => seq(
    $.FOR,
    $.for_indices,
    $.LOOP,
    $.equation_list,
    $.T_END,
    $.FOR
  ),

  for_clause_a: $ => seq(
    $.FOR,
    $.for_indices,
    $.LOOP,
    $.algorithm_list,
    $.T_END,
    $.FOR
  ),

  while_clause: $ => seq(
    $.WHILE,
    $.expression,
    $.LOOP,
    $.algorithm_list,
    $.T_END,
    $.WHILE
  ),

  when_clause_e: $ => seq(
    $.WHEN,
    $.expression,
    $.THEN,
    $.equation_list,
    optional($.else_when_e_list),
    $.T_END,
    $.WHEN
  ),

  else_when_e_list: $ => seq(
    $.else_when_e,
    optional($.else_when_e_list)
  ),

  else_when_e: $ => seq(
    $.ELSEWHEN,
    $.expression,
    $.THEN,
    $.equation_list
  ),

  when_clause_a: $ => seq(
    $.WHEN,
    $.expression,
    $.THEN,
    $.algorithm_list,
    optional($.else_when_a_list),
    $.T_END,
    $.WHEN
  ),

  else_when_a_list: $ => seq(
    $.else_when_a,
    optional($.else_when_a_list)
  ),

  else_when_a: $ => seq(
    $.ELSEWHEN,
    $.expression,
    $.THEN,
    $.algorithm_list
  ),

  equation_elseif_list: $ => seq(
    $.equation_elseif,
    optional($.equation_elseif_list)
  ),

  equation_elseif: $ => seq(
    $.ELSEIF,
    $.expression,
    $.THEN,
    $.equation_list
  ),

  algorithm_elseif_list: $ => seq(
    $.algorithm_elseif,
    optional($.algorithm_elseif_list)
  ),

  algorithm_elseif: $ => seq(
    $.ELSEIF,
    $.expression,
    $.THEN,
    $.algorithm_list
  ),

  // TODO: What the heck is `{ ... }?` ?
  // TODO: recursion
  equation_list_then: $ => seq(
    $.equation,
    $.SEMICOLON,
    $.equation_list_then
  ),

  // TODO: What the heck is `{ ... }?` ?
  // TODO: recursion
  // TODO: How to distinguish from equation_list_then?
  equation_list: $ => seq(
    $.equation,
    $.SEMICOLON,
    $.equation_list
  ),

  // TODO: What the heck is `{ ... }?` ?
  // TODO: recursion
  algorithm_list: $ => seq(
    $.algorithm,
    $.SEMICOLON,
    $.algorithm_list
  ),

  connect_clause: $ => seq(
    $.CONNECT,
    $.LPAR,
    $.component_reference,
    $.COMMA,
    $.component_reference,
    $.RPAR
  )
};
