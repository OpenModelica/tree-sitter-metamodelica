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

// A.5 Expressions
//
// From Towards Modelica 4 Meta-Programming and Language Modeling with MetaModelica 2.0
// Appendix A, section A.5 Expressions
// https://liu.diva-portal.org/smash/record.jsf?pid=diva2%3A418188&dswid=-9758

module.exports = {
  expression: $ => choice(
    $.if_expression,
    $.simple_expression,
    $.part_eval_function_expression,
    $.match_expression
  ),

  part_eval_function_expression: $ => seq(
    $.FUNCTION,
    $.component_reference,
    $.function_call
  ),

  if_expression: $ => seq(
    $.IF,
    $.expression,
    $.THEN,
    $.expression,
    repeat($.elseif_expression),
    $.ELSE,
    $.expression
  ),

  //elseif__expression_list

  elseif_expression: $ => seq(
    $.ELSEIF,
    $.expression,
    $.THEN,
    $.expression
  ),

  for_indices: $ => seq(
    $.for_index,
    optional(seq(
      $.COMMA,
      $.for_indices
    ))
  ),

  for_index: $ => seq(
    $.IDENT,
    optional(seq(
      optional(seq(
        $.GUARD,
        $.expression
      )),
      $.T_IN,
      $.expression
    ))
  ),

  // TODO: recursion?
  simple_expression: $ => choice(
    seq(
      $.simple_expr,
      optional(seq(
        $.COLONCOLON,
        $.simple_expression
      ))
    ),
    seq(
      $.IDENT,
      $.AS,
      $.simple_expression
    )
  ),

  simple_expr: $ => seq(
    $.logical_expression,
    optional(seq(
      $.COLON,
      $.logical_expression
    )),
    optional(seq(
      $.COLON,
      $.logical_expression
    ))
  ),

  // TODO: What is `( )*` ?
  logical_expression: $ => seq(
    $.logical_term,
    repeat(seq(
      $.T_OR,
      $.logical_term
    ))
  ),

  logical_term: $ => seq(
    $.logical_factor,
    repeat(seq(
      $.T_AND,
      $.logical_factor
    ))
  ),

  logical_factor: $ => seq(
    optional($.T_NOT),
    $.relation
  ),

  relation: $ => seq(
    $.arithmetic_expression,
    optional(seq(
      choice(
        $.LESS,
        $.LESSEQ,
        $.GREATER,
        $.GREATEREQ,
        $.EQEQ,
        $.LESSGT
      ),
      $.arithmetic_expression
    ))
  ),

  arithmetic_expression: $ => seq(
    $.unary_arithmetic_expression,
    repeat(seq(
      choice(
        $.PLUS,
        $.MINUS,
        $.PLUS_EW,
        $.MINUS_EW
      ),
      $.term
    ))
  ),

  unary_arithmetic_expression: $ => choice(
    seq(
      $.PLUS,
      $.term
    ),
    seq(
      $.MINUS,
      $.term
    ),
    seq(
      $.PLUS_EW,
      $.term
    ),
    seq(
      $.MINUS_EW,
      $.term
    ),
    $.term
  ),

  term: $ => seq(
    $.factor,
    repeat(seq(
      choice(
        $.STAR,
        $.SLASH,
        $.STAR_EW,
        $.SLASH_EW
      ),
      $.factor
    ))
  ),

  factor: $ => seq(
    $.primary,
    optional(seq(
      choice(
        $.POWER,
        $.POWER_EW
      ),
      $.primary
    ))
  ),

  primary: $ => prec.right(choice(
    $.UNSIGNED_INTEGER,
    $.UNSIGNED_REAL,
    $.STRING,
    $.T_FALSE,
    $.T_TRUE,
    $.component_reference__function_call,
    seq(
      $.DER,
      $.function_call
    ),
    seq(
      $.LPAR,
      $._output__expression_list
    ),
    seq(
      $.LBRACK,
      $._matrix__expression_list,
      $.RBRACK
    ),
    seq(
      $.LBRACE,
      $._for_or__expression_list,
      $.RBRACE
    ),
    $.T_END
  )),

  // TODO: recursive
  _matrix__expression_list: $ => seq(
    $._expression_list,
    optional(seq(
      $._SEMICOLON,
      $._matrix__expression_list
    ))
  ),

  // TODO: Why `__`?
  component_reference__function_call: $ => choice(
    seq(
      $.component_reference,
      optional($.function_call)
    ),
    seq(
      $.INITIAL,
      $.LPAR,
      $.RPAR
    )
  ),

  name_path: $ => seq(
    optional($.DOT),
    $.IDENT,
    repeat(seq(
      $.DOT,
      $.IDENT
    ))
  ),

  name_path_star: $ => seq(
    optional($.DOT),
    $._name_path_star2
  ),

  // TODO: Fix look ahead
  _name_path_star2: $ => choice(
    seq(
      $.IDENT,
      optional($.STAR_EW)
    ),
    seq(
      $.IDENT,
      $.DOT,
      $._name_path_star2
    )
  ),

  component_reference: $ => choice(
    seq(
      optional($.DOT),
      $.component_reference2
    ),
    $.ALLWILD,
    $.WILD
  ),

  // TODO: recursion
  component_reference2: $ => seq(
    choice(
      $.IDENT,
      $.OPERATOR
    ),
    optional($.array_subscripts),
    optional(seq(
      $.DOT,
      $.component_reference2
    ))
  ),

  function_call: $ => seq(
    $.LPAR,
    $.function_arguments,
    $.RPAR
  ),

  function_arguments: $ => seq(
    $._for_or__expression_list,
    optional($.named_arguments)
  ),

  // TODO: What is `{ }?` ?
  _for_or__expression_list: $ => seq(
    $.expression,
    optional(choice(
      seq(
        $.COMMA,
        $._for_or__expression_list2
      ),
      seq(
        $.FOR,
        $.for_indices
      )
    )),
  ),

  // TODO: What is `{ }?` ?
  // TODO: recursion
  _for_or__expression_list2: $ => seq(
    $.expression,
    optional(seq(
      $.COMMA,
      $._for_or__expression_list2
    ))
  ),

  // TODO: recursive
  named_arguments: $ => seq(
    $.named_argument,
    optional(seq(
      $.COMMA,
      $.named_arguments
    ))
  ),

  named_argument: $ => seq(
    choice(
      $.IDENT,
      $.OPERATOR
    ),
    $.EQUALS,
    $.expression
  ),

  // TODO: recursion
  _output__expression_list: $ => choice(
    $.RPAR,
    seq(
      $.COMMA,
      $._output__expression_list
    ),
    seq(
      $.expression,
      choice(
        seq(
          $.COMMA,
          $._output__expression_list
        ),
        $.RPAR
      )
    )
  ),

  _expression_list: $ => seq(
    $.expression,
    optional(seq(
      $.COMMA,
      $._expression_list
    ))
  ),

  array_subscripts: $ => seq(
    $.LBRACK,
    $._subscript_list,
    $.RBRACK
  ),

  // TODO: Recursion
  _subscript_list: $ => seq(
    $.subscript,
    optional(seq(
      $.COMMA,
      $._subscript_list
    ))
  ),

  subscript: $ => choice(
    $.expression,
    $.COLON
  ),

  comment: $ => choice(
    seq(
      $.string_comment,
      optional($.annotation)
    ),
    seq(
      optional($.string_comment),
      $.annotation
    )
  ),

  // TODO: What is `(PLUS s2 = STRING)*`?
  string_comment: $ => seq(
    $.STRING,
    repeat(seq(
      $.PLUS,
      $.STRING
    ))
  ),

  annotation: $ => seq(
    $.T_ANNOTATION,
    $.class_modification
  )
};
