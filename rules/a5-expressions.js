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

  //elseif_expression_list

  elseif_expression: $ => seq(
    $.ELSEIF,
    $.expression,
    $.THEN,
    $.expression
  ),

  for_indices: $ => seq(
    $.for_index,
    optional(seq(
      $._COMMA,
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
        $._COLONCOLON,
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
      $._COLON,
      $.logical_expression
    )),
    optional(seq(
      $._COLON,
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
        $._LESS,
        $._LESSEQ,
        $._GREATER,
        $._GREATEREQ,
        $._EQEQ,
        $._LESSGT
      ),
      $.arithmetic_expression
    ))
  ),

  arithmetic_expression: $ => seq(
    $.unary_arithmetic_expression,
    repeat(seq(
      choice(
        $._PLUS,
        $._MINUS,
        $._PLUS_EW,
        $._MINUS_EW
      ),
      $.term
    ))
  ),

  unary_arithmetic_expression: $ => choice(
    seq(
      $._PLUS,
      $.term
    ),
    seq(
      $._MINUS,
      $.term
    ),
    seq(
      $._PLUS_EW,
      $.term
    ),
    seq(
      $._MINUS_EW,
      $.term
    ),
    $.term
  ),

  term: $ => seq(
    $.factor,
    repeat(seq(
      choice(
        $._STAR,
        $._SLASH,
        $._STAR_EW,
        $._SLASH_EW
      ),
      $.factor
    ))
  ),

  factor: $ => seq(
    $.primary,
    optional(seq(
      choice(
        $._POWER,
        $._POWER_EW
      ),
      $.primary
    ))
  ),

  primary: $ => choice(
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
      $._LPAR,
      $.output_expression_list
    ),
    seq(
      $._LBRACK,
      $.matrix_expression_list,
      $._RBRACK
    ),
    seq(
      $._LBRACE,
      $.for_or_expression_list,
      $._RBRACE
    ),
    $.T_END
  ),

  // TODO: recursive
  matrix_expression_list: $ => seq(
    $.expression_list,
    optional(seq(
      $._SEMICOLON,
      $.matrix_expression_list
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
      $._LPAR,
      $._RPAR
    )
  ),

  name_path: $ => seq(
    optional($._DOT),
    $.IDENT,
    repeat(seq(
      $._DOT,
      $.IDENT
    ))
  ),

  name_path_star: $ => seq(
    optional($._DOT),
    $.name_path_star2
  ),

  // TODO: What is `{ }?` ?
  name_path_star2: $ => seq(
    choice(
      $.IDENT,
      //$.CODE
    ),
    $._DOT,
    $.name_path_star2
  ),

  component_reference: $ => choice(
    seq(
      optional($._DOT),
      $.component_reference2
    ),
    $._ALLWILD,
    $._WILD
  ),

  // TODO: recursion
  component_reference2: $ => seq(
    choice(
      $.IDENT,
      $.OPERATOR
    ),
    optional($.array_subscripts),
    optional(seq(
      $._DOT,
      $.component_reference2
    ))
  ),

  function_call: $ => seq(
    $._LPAR,
    $.function_arguments,
    $._RPAR
  ),

  function_arguments: $ => seq(
    $.for_or_expression_list,
    optional($.named_arguments)
  ),

  // TODO: What is `{ }?` ?
  for_or_expression_list: $ => seq(
    $.expression,
    optional(choice(
      seq(
        $._COMMA,
        $.for_or_expression_list2
      ),
      seq(
        $.FOR,
        $.for_indices
      )
    )),
  ),

  // TODO: What is `{ }?` ?
  // TODO: recursion
  for_or_expression_list2: $ => seq(
    $.expression,
    optional(seq(
      $._COMMA,
      $.for_or_expression_list2
    ))
  ),

  // TODO: recursive
  named_arguments: $ => seq(
    $.named_argument,
    optional(seq(
      $._COMMA,
      $.named_arguments
    ))
  ),

  named_argument: $ => seq(
    choice(
      $.IDENT,
      $.OPERATOR
    ),
    $._EQUALS,
    $.expression
  ),

  // TODO: recursion
  output_expression_list: $ => choice(
    $._RPAR,
    seq(
      $._COMMA,
      $.output_expression_list
    ),
    seq(
      $.expression,
      choice(
        seq(
          $._COMMA,
          $.output_expression_list
        ),
        $._RPAR
      )
    )
  ),

  expression_list: $ => seq(
    $.expression,
    optional(seq(
      $._COMMA,
      $.expression_list
    ))
  ),

  array_subscripts: $ => seq(
    $._LBRACK,
    $.subscript_list,
    $._RBRACK
  ),

  // TODO: Recursion
  subscript_list: $ => seq(
    $.subscript,
    optional(seq(
      $._COMMA,
      $.subscript_list
    ))
  ),

  subscript: $ => choice(
    $.expression,
    $._COLON
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

  // TODO: What is `(_PLUS s2 = STRING)*`?
  string_comment: $ => seq(
    $.STRING,
    repeat(seq(
      $._PLUS,
      $.STRING
    ))
  ),

  annotation: $ => seq(
    $.T_ANNOTATION,
    $.class_modification
  )
};