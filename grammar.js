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

/**
 * @author AnHeuermann
 */

module.exports = grammar({
  name: "metamodelica",

  rules: {
    // A.1 Class and Main Grammar Elements
    stored_definitions: $ => seq(
      optional(field("withinClause", seq($.within_clause, ";"))),
      optional(field("classDefinitionList", $.class_definition_list))
    ),

    within_clause: $ => seq(
      field("within", "within"),
      optional(field("namePath", $.name_path))
    ),

    class_definition_list: $ => repeat1(
      seq(
        optional(field("final", "final")),
        field("classDefinition", $.class_definition),
        ";"
      )
    ),

    class_definition: $ => seq(
      optional(field("encapsulated", "encapsulated")),
      optional(field("partial", "partial")),
      field("classType", $.class_type),
      field("classSpecifier", $.class_specifier)
    ),

    class_type: $ => choice(
      field("class", "class"),
      field("optimization", "optimization"),
      field("model", "model"),
      field("record", "record"),
      field("block", "block"),
      seq(
        optional("expandable"),
        field("connector", "connector")
      ),
      field("type", "type"),
      field("package", "package"),
      field("function", "function"),
      field("uniontype", "uniontype"),
      seq(
        field("operator", "operator"),
        optional(choice("function", "record"))
      )
    ),

    identifier: $ => choice(
      $.IDENT,
      //$.DER,
      //$.CODE,
      //$.EQUALITY,
      //$.INITIAL
    ),

    name_path: $ => "TODO",
    class_specifier: $ => "TODO",

    // A.0 Lexical conventions
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
    ),
  }
});
