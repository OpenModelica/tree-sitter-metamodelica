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
        choice(
          $.IF,
          $.GUARD,
        ),
        $.expression
      )),
      $.T_IN,
      $.expression
    ))
  ),

  // TODO: recursion?
  simple_expression: $ => choice(
    seq(
      $._simple_expr,
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

  _simple_expr: $ => seq(
    $._logical_expression,
    optional(seq(
      $.COLON,
      $._logical_expression
    )),
    optional(seq(
      $.COLON,
      $._logical_expression
    ))
  ),

  // TODO: What is `( )*` ?
  _logical_expression: $ => seq(
    $._logical_term,
    repeat(seq(
      $.T_OR,
      $._logical_term
    ))
  ),

  _logical_term: $ => seq(
    $._logical_factor,
    repeat(seq(
      $.T_AND,
      $._logical_factor
    ))
  ),

  _logical_factor: $ => seq(
    optional($.T_NOT),
    $._relation
  ),

  _relation: $ => seq(
    $._arithmetic_expression,
    optional(seq(
      choice(
        $.LESS,
        $.LESSEQ,
        $.GREATER,
        $.GREATEREQ,
        $.EQEQ,
        $.LESSGT
      ),
      $._arithmetic_expression
    ))
  ),

  _arithmetic_expression: $ => seq(
    $._unary_arithmetic_expression,
    repeat(seq(
      choice(
        $.PLUS,
        $.MINUS,
        $.PLUS_EW,
        $.MINUS_EW
      ),
      $._term
    ))
  ),

  _unary_arithmetic_expression: $ => choice(
    seq(
      $.PLUS,
      $._term
    ),
    seq(
      $.MINUS,
      $._term
    ),
    seq(
      $.PLUS_EW,
      $._term
    ),
    seq(
      $.MINUS_EW,
      $._term
    ),
    $._term
  ),

  _term: $ => seq(
    $._factor,
    repeat(seq(
      choice(
        $.STAR,
        $.SLASH,
        $.STAR_EW,
        $.SLASH_EW
      ),
      $._factor
    ))
  ),

  _factor: $ => seq(
    $._primary,
    optional(seq(
      choice(
        $.POWER,
        $.POWER_EW
      ),
      $._primary
    ))
  ),

  _primary: $ => prec.left(choice(
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
    // TODO: omc isn't using this construct
    //seq(
    //  $.PURE,
    //  $.function_call
    //),
    seq(
      $.LPAR,
      $._output_expression_list,
      // TODO: Add (array_subscripts)?
      //optional($.array_subscripts)
    ),
    seq(
      $.LBRACK,
      $._matrix_expression_list,
      $.RBRACK
    ),
    seq(
      $.LBRACE,
      // TODO: Is this correct?
      optional($._for_or_expression_list),
      $.RBRACE
    ),
    $.T_END
  )),

  // TODO: recursive
  _matrix_expression_list: $ => seq(
    $._expression_list,
    optional(seq(
      $._SEMICOLON,
      $._matrix_expression_list
    ))
  ),

  component_reference__function_call: $ => choice(
    seq(
      field("functionName", $.component_reference),
      field("polymorphicType", $.polymorphic_type_specifier),
      $.function_call
    ),
    seq(
      field("functionName", $.component_reference),
      $.function_call,
      // TODO: Add DOT expression?
      //optional(seq(
      //    $.DOT,
      //    $.expression
      //))
    ),
    field("componentReference", $.component_reference),
    seq(
      $.INITIAL,
      $.LPAR,
      $.RPAR
    )
  ),

  polymorphic_type_specifier: $ => seq(
      $.LESS,
      $._name_list,
      $.GREATER,
  ),

  name_path: $ => seq(
    optional($.DOT),
    choice(
      field("identifier", $.IDENT),
      $.CODE
    ),
    repeat(seq(
      $.DOT,
      choice(
        field("identifier", $.IDENT),
        $.CODE
      )
    ))
  ),

  name_path_star: $ => seq(
    optional($.DOT),
    $._name_path_star2
  ),

  // TODO: Fix look ahead

  _name_path_star2: $ => choice(
    seq(
      choice(
        field("identifier", $.IDENT),
        $.CODE
      ),
      optional($.STAR_EW)
    ),
    seq(
      choice(
        field("identifier", $.IDENT),
        $.CODE
      ),
      $.DOT,
      $._name_path_star2
    ),
    // Modification for import like `import A.{foo,bar}`
    seq(
      $.LBRACE,
      optional($.IDENT),
      repeat(seq(
        $.COMMA,
        $.IDENT
      )),
      $.RBRACE
    )
  ),

  component_reference: $ => choice(
    seq(
      optional($.DOT),
      $._component_reference2
    ),
    $.ALLWILD,
    $.WILD
  ),

  // TODO: recursion
  _component_reference2: $ => seq(
    choice(
      $.IDENT,
      $.OPERATOR
    ),
    optional($.array_subscripts),
    optional(seq(
      $.DOT,
      $._component_reference2
    ))
  ),

  //TODO: Can function_arguments be optional?
  function_call: $ => seq(
    $.LPAR,
    optional($.function_arguments),
    $.RPAR
  ),

  // Not sure, but _for_or_expression_list should be optional
  function_arguments: $ => choice(
    seq(
      $._for_or_expression_list,
      optional(seq(
        $.COMMA,
        $._named_arguments
      ))
    ),
    $._named_arguments
  ),

  // TODO: Do look ahead
  _for_or_expression_list: $ => seq(
    $.expression,
    optional(choice(
      repeat1(seq(
        $.COMMA,
        $.expression
      )),
      seq(
        optional($.THREADED),
        $.FOR,
        $.for_indices
      )
    )),
  ),

  //_for_or_expression_list2

  _named_arguments: $ => seq(
    $.named_argument,
    repeat(seq(
      $.COMMA,
      $.named_argument
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
  _output_expression_list: $ => choice(
    $.RPAR,
    seq(
      $.COMMA,
      $._output_expression_list
    ),
    seq(
      $.expression,
      choice(
        seq(
          $.COMMA,
          $._output_expression_list
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
  ),

  // TODO: Add code_expression

};
