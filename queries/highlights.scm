;;;;; Highlights in the examples happen between these symbols: >...<
; List of available captures for tree-sitter highlights can be found in
; https://github.com/tree-sitter/tree-sitter/blob/dcb7acede4b31fedfc9d65b902fc95f6fe5ea099/cli/src/highlight.rs#L143-L171


;;; Errors
(ERROR) @error  ;; when something is placed wrong
; error has to be added to the config.json file to be shown correctly ;;"error": {"color": "red", "bold": true, "underline": true}

;;; Strings
(STRING) @string ;; R(unit=>"Ohm"<)

;;; Comments
[
  (BLOCK_COMMENT)   ;; >/* comment */<
  (COMMENT)         ;; >// comment<
]
(string_comment (STRING) @comment)  ;; model foo >"description"<

;;; Numbers
[
  (UNSIGNED_INTEGER)  ;; >220<
  (UNSIGNED_REAL)     ;; >3.14159<
] @number

;;; Types
(type_specifier (name_path (IDENT) @type ))   ;; >A<.>MyType< x
(T_REAL) @type.builtin      ;; >Real< x
(T_INTEGER) @type.builtin   ;; >Integer< x
(T_BOOLEAN) @type.builtin   ;; >Boolean< x
(T_STRING) @type.builtin    ;; >String< x
(T_LIST) @type.builtin      ;; >List<<Real> x
(T_OPTION) @type.builtin    ;; >Option< <Real> x
(T_TUPLE) @type.builtin     ;; >Tuple< <T1, T2, T3> x
(T_ANY) @type.builtin       ;; subtypeof >Any<

;;; Variables
(declaration (IDENT) @variable.parameter) ;; Real >x<
(component_reference_function_call componentReference: (component_reference) @variable.parameter) ;; >x<

;;; Function calls
(component_reference_function_call functionName: (component_reference) @function)

;;; Classes
(class_definition (class_type class: (CLASS))(class_specifier (identifier) @module))                ;; class >A< end >A<;
(class_definition (class_type optimization: (OPTIMIZATION))(class_specifier (identifier) @module))  ;; optimization >A< end >A<;
(class_definition (class_type model: (MODEL))(class_specifier (identifier) @module))                ;; model >A< end >A<;
(class_definition (class_type record: (RECORD))(class_specifier (identifier) @type))                ;; record >R< end >R<;
(class_definition (class_type connector: (CONNECTOR))(class_specifier (identifier) @module))        ;; connector >C< end >C<;
(class_definition (class_type type: (TYPE))(class_specifier (identifier) @type))                    ;; type >T< end >T<;
(class_definition (class_type package: (PACKAGE))(class_specifier (identifier) @module))            ;; package >A< end >A<;
(class_definition (class_type function: (FUNCTION))(class_specifier (identifier) @function))        ;; function >foo< end >foo<;
(class_definition (class_type uniontype: (UNIONTYPE))(class_specifier (identifier) @type))          ;; uniontype >T< end >T<;

;;; Within
(within_clause namePath: (name_path (IDENT) @module)) ;; withing >PackageA<.>PackageB<;

;;; Import
(explicit_import_name (IDENT) @module)                                            ;; import >A< = PackageA;
(explicit_import_name namePath: (name_path (IDENT) @module))                      ;; import B = >PackageA<.>PackageB<;
(implicit_import_name namePathStar: (name_path_star identifier: (IDENT) @module)) ;; import >PackageA<.>PackageB<.*;

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
  (SUBTYPEOF)
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
  (TRY)
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
