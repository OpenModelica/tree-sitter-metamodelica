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

// A.0 Lexical conventions
//
// From Modelica 3.7 Language Specification
// Appendix A, section A.1 Lexical conventions
// https://specification.modelica.org/master/modelica-concrete-syntax.html

module.exports = {
  IDENT: $ => token(
    choice(
      // NON-DIGIT { DIGIT | NON-DIGIT }
      seq(
        /[_a-zA-Z]/,
        repeat(
          /[_a-zA-Z0-9]/,
        )
      ),
      // Q_IDENT
      seq(
        "'",
        repeat(
          choice(
            // Q_CHAR
            /[_a-zA-Z]/,
            /[0-9]/,
            "!", "#", "$", "%", "&", "(", ")", "*", "+", ",", "-", ".", "/",
            ":", ";", "<", ">", "=", "?", "@", "[", "]", "^", "{", "}", "|",
            "~", " ",
            "\"",
            // S_ESCAPE
            "\\'", "\\\"", "\\?", "\\\\", "\\a", "\\b", "\\f", "\\n", "\\r",
            "\\t", "\\v",
          )
        ),
        "'"
      )
    )
  ),

  STRING: $ => token(
    seq(
      "\"",
      repeat(
        choice(
          // S_CHAR
          /[^"\\]/,
          // S_ESCAPE
          "\\'", "\\\"", "\\?", "\\\\", "\\a", "\\b", "\\f", "\\n", "\\r",
          "\\t", "\\v",
        )
      ),
      "\""
    )
  ),

  UNSIGNED_INTEGER: $ => token(
    repeat1(
      /[0-9]/
      )
  ),

  UNSIGNED_REAL: $ => token(
    choice(
      seq(
        // UNSIGNED_INTEGER,
        /[0-9]+/,
        ".",
        optional(
          // UNSIGNED_INTEGER
          /[0-9]+/
        )
      ),
      seq(
        // UNSIGNED_INTEGER
        /[0-9]+/,
        optional(
          seq(
            ".",
            optional(
              // UNSIGNED_INTEGER
              /[0-9]+/
            )
          )
        ),
        choice("e", "E"),
        optional(choice("+", "-")),
        // UNSIGNED_INTEGER
        /[0-9]+/
      ),
      seq(
        ".",
        // UNSIGNED_INTEGER
        /[0-9]+/,
        optional(
          seq(
            choice("e", "E"),
            optional(choice("+", "-")),
            // UNSIGNED_INTEGER
            /[0-9]+/
          )
        )
      )
    )
  ),

  BLOCK_COMMENT: $ => token(
    seq(
      "/*",
      /[^*]*\*+([^/*][^*]*\*+)*/,
      "/"
    )
  ),

  comment: $ => token(
    seq(
      "//",
      /[^\r\n]*/
    )
  )
};
