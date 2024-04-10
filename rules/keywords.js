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
  ASSIGN: $ => ":=",
  COLON: $ => ":",
  COMMA: $ => ",",
  EQUALS: $ => "=",
  GREATER: $ => ">",
  LESS: $ => "<",
  LPAR: $ => "(",
  RPAR: $ => ")",
  SEMICOLON: $ => ";",

  // keywords
  BLOCK: $ => "block",
  BREAK: $ => "break",
  CLASS: $ => "class",
  CONNECT: $ => "connect",
  CONNECTOR: $ => "connector",
  CONSTANT: $ => "constant",
  CONSTRAINEDBY: $ => "constrainedby",
  CONSTRAINT: $ => "constraint",
  DISCRETE: $ => "discrete",
  EACH: $ => "each",
  ELSE: $ => "else",
  ELSEIF: $ => "elseif",
  ELSEWHEN: $ => "elsewhen",
  ENCAPSULATED:  $ => "encapsulated",
  ENUMERATION: $ => "enumeration",
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
  IF: $ => "if",
  IMPORT: $ => "import",
  INITIAL: $ => "initial",
  INNER: $ => "inner",
  LOOP: $ => "loop",
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
  T_ALGORITHM: $ => "algorithm",
  T_END: $ => "end",
  T_INPUT: $ => "input",
  T_OUTER: $ => "outer",
  T_OUTPUT: $ => "output",
  THEN: $ => "then",
  TYPE: $ => "type",
  UNIONTYPE: $ => "uniontype",
  WHEN: $ => "when",
  WHILE: $ => "while",
  WITHIN: $ => "within",
}
