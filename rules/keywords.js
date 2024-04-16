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

// Keywords and special characters

module.exports = {
  // Reserved characters
  ALLWILD: $ => "__",
  ASSIGN: $ => ":=",
  COLON: $ => ":",
  COLONCOLON: $ => "::",
  COMMA: $ => ",",
  DOT: $ => ".",
  EQEQ: $ => "==",
  EQUALS: $ => "=",
  GREATER: $ => ">",
  GREATEREQ: $ => ">=",
  LBRACE: $ => "{",
  LBRACK: $ => "[",
  LESS: $ => "<",
  LESSEQ: $ => "<=",
  LESSGT: $ => "<>",
  LPAR: $ => "(",
  MINUS_EW: $ => ".-",
  MINUS: $ => "-",
  PLUS_EW: $ => ".+",
  PLUS: $ => "+",
  POWER_EW: $ => ".^",
  POWER: $ => "^",
  RBRACE: $ => "}",
  RBRACK: $ => "]",
  RPAR: $ => ")",
  _SEMICOLON: $ => ";",
  SLASH_EW: $ => "./",
  SLASH: $ => "/",
  STAR_EW: $ => ".*",
  STAR: $ => "*",
  WILD: $ => "_",

  // keywords
  ALGORITHM: $ => "algorithm",
  AS: $ => "as",
  BLOCK: $ => "block",
  BREAK: $ => "break",
  CASE: $ => "case",
  CLASS: $ => "class",
  CONNECT: $ => "connect",
  CONNECTOR: $ => "connector",
  CONSTANT: $ => "constant",
  CONSTRAINEDBY: $ => "constrainedby",
  CONSTRAINT: $ => "constraint",
  DER: $ => "der",
  DISCRETE: $ => "discrete",
  EACH: $ => "each",
  ELSE: $ => "else",
  ELSEIF: $ => "elseif",
  ELSEWHEN: $ => "elsewhen",
  ENCAPSULATED:  $ => "encapsulated",
  ENUMERATION: $ => "enumeration",
  EQUALITY: $ => "equality",
  EQUATION: $ => "equation",
  EXPANDABLE: $ => "expandable",
  EXTENDS: $ => "extends",
  EXTERNAL: $ => "external",
  FAILURE: $ => "failure",
  FINAL: $ => "final",
  FINAL: $ => "final",
  FLOW: $ => "flow",
  FOR: $ => "for",
  FUNCTION: $ => "function",
  GUARD: $ => "guard",
  IF: $ => "if",
  IMPORT: $ => "import",
  INITIAL: $ => "initial",
  INNER: $ => "inner",
  LOCAL: $ => "local",
  LOOP: $ => "loop",
  MATCH: $ => "match",
  MATCHCONTINUE: $ => "matchcontinue",
  MODEL: $ => "model",
  OPERATOR: $ => "operator",
  OPTIMIZATION: $ => "optimization",
  OVERLOAD: $ => "overload",
  PACKAGE: $ => "package",
  PARAMETER: $ => "parameter",
  PARTIAL: $ => "partial",
  PROTECTED: $ => "protected",
  PUBLIC: $ => "public",
  RECORD: $ => "record",
  REDECLARE: $ => "redeclare",
  REPLACEABLE: $ => "replaceable",
  RETURN: $ => "return",
  STREAM: $ => "stream",
  SUBTYPEOF: $ => "subtypeof",
  T_ALGORITHM: $ => "algorithm",
  T_AND: $ => "and",
  T_ANNOTATION: $ => "annotation",
  T_END: $ => "end",
  T_FALSE: $ => "false",
  T_IN: $ => "in",
  T_INPUT: $ => "input",
  T_NOT: $ => "not",
  T_OR: $ => "or",
  T_OUTER: $ => "outer",
  T_OUTPUT: $ => "output",
  T_TRUE: $ => "true",
  THEN: $ => "then",
  TRY: $ => "try",
  TYPE: $ => "type",
  UNIONTYPE: $ => "uniontype",
  WHEN: $ => "when",
  WHILE: $ => "while",
  WITHIN: $ => "within",
}
