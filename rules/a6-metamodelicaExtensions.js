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

// A.6 MetaModelica Extensions
//
// From Towards Modelica 4 Meta-Programming and Language Modeling with MetaModelica 2.0
// Appendix A, section A.6 MetaModelica Extensions
// https://liu.diva-portal.org/smash/record.jsf?pid=diva2%3A418188&dswid=-9758

module.exports = {
  match_expression: $ => choice(
    seq(
      $.MATCHCONTINUE,
      $.expression,
      optional($.string_comment),
      optional($.local_clause),
      $.cases,
      $.T_END,
      $.MATCHCONTINUE
    ),
    seq(
      $.MATCH,
      $.expression,
      optional($.string_comment),
      optional($.local_clause),
      $.cases,
      $.T_END,
      $.MATCH
    )
  ),

  // TODO: el=_element_list ??
  local_clause: $ => seq(
    $.LOCAL,
    repeat($._element_list)
  ),

  cases: $ => seq(
    field("case", repeat1($.onecase)),
    field("elsecase", optional($.elsecase))
  ),

  elsecase: $ => seq(
    $.ELSE,
    optional(seq(
      optional($.string_comment),
      optional(seq(
        $.EQUATION,
        repeat($._equation_list_then)
      )),
      $.THEN
    )),
    $.expression,
    $._SEMICOLON
  ),

  onecase: $ => seq(
    $.CASE,
    $._pattern,
    optional($.string_comment),
    choice(
      optional(seq(
        $.EQUATION,
        repeat($._equation_list_then)
      )),
      optional(seq(
        $.ALGORITHM,
        repeat($._algorithm_annotation_list)
      )),
    ),
    $.THEN,
    $.expression,
    $._SEMICOLON
  ),

  // TODO: e=expression ???
  _pattern: $ => seq(
    $.expression
  ),

  try_clause: $ => seq(
    $.TRY,
    repeat($._algorithm_list),
    $.ELSE,
    repeat($._algorithm_list),
    $.T_END,
    $.TRY
  ),
};
