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
  // TODO: Do look ahead
  initial_equation_clause: $ => prec.right(seq(
    $.INITIAL,
    $.EQUATION,
    repeat($._equation_annotation_list)
  )),

  // TODO: Do look ahead
  equation_clause: $ => prec.right(seq(
    $.EQUATION,
    repeat($._equation_annotation_list)
  )),

  // TODO: Ask Adrian if this is correct with LA of _constraint_annotation_list
  // TODO: Do look ahead
  constraint_clause: $ => prec.right(seq(
    $.CONSTRAINT,
    repeat($._constraint_annotation_list)
  )),

  // TODO: Do look ahead
  _equation_annotation_list: $ => choice(
    seq(
      $.equation,
      $._SEMICOLON
    ),
    seq(
      $.annotation,
      $._SEMICOLON
    )
  ),

  // TODO: What the heck is `{ ... }?` ?
  // TODO: Do look ahead
  _constraint_annotation_list: $ => choice(
    seq(
      $.equation,
      $._SEMICOLON
    ),
    seq(
      $.annotation,
      $._SEMICOLON
    )
  ),

  algorithm_clause: $ => prec.right(seq(
    $.T_ALGORITHM,
    repeat($._algorithm_annotation_list)
  )),

  // TODO: What the heck is `{ ... }?` ?
  initial_algorithm_clause: $ => prec.right(seq(
    $.INITIAL,
    $.T_ALGORITHM,
    repeat($._algorithm_annotation_list)
  )),

  // TODO: What the heck is `{ ... }?` ?
  _algorithm_annotation_list: $ => choice(
    seq(
      $.algorithm,
      $._SEMICOLON
    ),
    seq(
      $.annotation,
      $._SEMICOLON
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
    optional($.comment)
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
    optional($.comment)
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
    optional($.comment)
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
    $._equation_list,
    optional($._equation_elseif_list),
    optional(seq(
      $.ELSE,
      $._equation_list
    )),
    $.T_END,
    $.IF
  ),

  conditional_equation_a: $ => seq(
    $.IF,
    $.expression,
    $.THEN,
    $._algorithm_list,
    optional($._algorithm_elseif_list),
    optional(seq(
      $.ELSE,
      $._algorithm_list
    )),
    $.T_END,
    $.IF
  ),

  for_clause_e: $ => seq(
    $.FOR,
    $.for_indices,
    $.LOOP,
    $._equation_list,
    $.T_END,
    $.FOR
  ),

  for_clause_a: $ => seq(
    $.FOR,
    $.for_indices,
    $.LOOP,
    $._algorithm_list,
    $.T_END,
    $.FOR
  ),

  while_clause: $ => seq(
    $.WHILE,
    $.expression,
    $.LOOP,
    $._algorithm_list,
    $.T_END,
    $.WHILE
  ),

  when_clause_e: $ => seq(
    $.WHEN,
    $.expression,
    $.THEN,
    $._equation_list,
    optional($._else_when_e_list),
    $.T_END,
    $.WHEN
  ),

  _else_when_e_list: $ => seq(
    $.else_when_e,
    optional($._else_when_e_list)
  ),

  else_when_e: $ => seq(
    $.ELSEWHEN,
    $.expression,
    $.THEN,
    $._equation_list
  ),

  when_clause_a: $ => seq(
    $.WHEN,
    $.expression,
    $.THEN,
    $._algorithm_list,
    optional($._else_when_a_list),
    $.T_END,
    $.WHEN
  ),

  _else_when_a_list: $ => seq(
    $.else_when_a,
    optional($._else_when_a_list)
  ),

  else_when_a: $ => seq(
    $.ELSEWHEN,
    $.expression,
    $.THEN,
    $._algorithm_list
  ),

  _equation_elseif_list: $ => seq(
    $.equation_elseif,
    optional($._equation_elseif_list)
  ),

  equation_elseif: $ => seq(
    $.ELSEIF,
    $.expression,
    $.THEN,
    $._equation_list
  ),

  _algorithm_elseif_list: $ => seq(
    $.algorithm_elseif,
    optional($._algorithm_elseif_list)
  ),

  algorithm_elseif: $ => seq(
    $.ELSEIF,
    $.expression,
    $.THEN,
    $._algorithm_list
  ),

  // TODO: What the heck is `{ ... }?` ?
  // TODO: recursion
  _equation_list_then: $ => seq(
    $.equation,
    $._SEMICOLON,
    $._equation_list_then
  ),

  // TODO: What the heck is `{ ... }?` ?
  // TODO: recursion
  // TODO: How to distinguish from _equation_list_then?
  _equation_list: $ => seq(
    $.equation,
    $._SEMICOLON,
    $._equation_list
  ),

  // TODO: What the heck is `{ ... }?` ?
  // TODO: recursion
  _algorithm_list: $ => seq(
    $.algorithm,
    $._SEMICOLON,
    $._algorithm_list
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
