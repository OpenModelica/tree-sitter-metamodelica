// A.0 Lexical conventions

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
