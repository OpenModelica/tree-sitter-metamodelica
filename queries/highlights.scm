;;;;; Highlights in the examples happen between these symbols: >...<


(ERROR) @error  ;; when something is placed wrong
; error has to be added to the config.json file to be shown correctly ;;"error": {"color": "red", "bold": true, "underline": true}

;;; Strings
(STRING) @string ;; R(unit=>"Ohm"<)

;;; Comments
[
  (BLOCK_COMMENT)   ;; >/* comment */<
  (COMMENT)         ;; >// comment<
  (string_comment)  ;; model foo >"description"<
] @comment


;;; Numbers
[
  (UNSIGNED_INTEGER)  ;; >220<
  (UNSIGNED_REAL)     ;; >3.14159<
] @number


;;; Types
(type_specifier) @type.builtin  ;; >Real< x


;;; Variables
;; (enumeration_literal identifier: (IDENT) @variable.builtin)         ;; type foo = enumeration(>bar<, >test<);
;; (declaration identifier: (IDENT) @variable.builtin)                 ;; Resistor >R1< (R=10);
;; (element_modification name: (name) @variable.parameter)             ;; Resistor R1( >R< =10);
;; (modification (expression (simple_expression (primary_expression (component_reference) @variable.parameter))))
;; ;; e.g. annotation(derivative = >tsat_der<);
;; ;; e.g. Resistor R1(R= >S<);


;;; Function Builtins
(EQUALITY) @function.builtin  ;; >equality<(id = id2);
(FAILURE) @function.builtin   ;; >failure<(equality(id = id2));

;; KEYWORDS
[
  (AS)
  (BLOCK)
  (BREAK)
  (CASE)
  (CLASS)
  (CONNECT)
  (CONNECTOR)
  (CONSTANT)
  (CONSTRAINEDBY)
  (CONSTRAINT)
  (DER)
  (DISCRETE)
  (EACH)
  (ELSE)
  (ELSEIF)
  (ELSEWHEN)
  (ENCAPSULATED)
  (ENUMERATION)
  (EQUALITY)
  (EQUATION)
  (EXPANDABLE)
  (EXTENDS)
  (EXTERNAL)
  (FAILURE)
  (FINAL)
  (FINAL)
  (FLOW)
  (FOR)
  (FUNCTION)
  (GUARD)
  (IF)
  (IMPORT)
  (INITIAL)
  (INNER)
  (LOCAL)
  (LOOP)
  (MATCH)
  (MATCHCONTINUE)
  (MODEL)
  (OPERATOR)
  (OPTIMIZATION)
  (OVERLOAD)
  (PACKAGE)
  (PARAMETER)
  (PARTIAL)
  (PROTECTED)
  (PUBLIC)
  (RECORD)
  (REDECLARE)
  (REPLACEABLE)
  (RETURN)
  (STREAM)
  (T_ALGORITHM)
  (T_AND)
  (T_ANNOTATION)
  (T_END)
  (T_FALSE)
  (T_IN)
  (T_INPUT)
  (T_NOT)
  (T_OR)
  (T_OUTER)
  (T_OUTPUT)
  (T_TRUE)
  (THEN)
  (TYPE)
  (UNIONTYPE)
  (WHEN)
  (WHILE)
  (WITHIN)
] @keyword

;; PUNCTUATION BRACKET
[
  (LBRACE)
  (LBRACK)
  (LPAR)
  (RBRACE)
  (RBRACK)
  (RPAR)
] @punctuation.bracket

;; OPERATOR
[
  (ALLWILD)
  (ASSIGN)
  (COLON)
  (COLONCOLON)
  (COMMA)
  (DOT)
  (EQEQ)
  (EQUALS)
  (GREATER)
  (GREATEREQ)
  (LESS)
  (LESSEQ)
  (LESSGT)
  (MINUS_EW)
  (MINUS)
  (PLUS_EW)
  (PLUS)
  (POWER_EW)
  (POWER)
  (SLASH_EW)
  (SLASH)
  (STAR_EW)
  (STAR)
  (WILD)
] @operator
