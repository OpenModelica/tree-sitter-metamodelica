; Class definitions

(class_definition
  (class_type
    class: (CLASS)
  )
  (class_specifier
    identifier: (identifier) @name
    comment: (string_comment
      (STRING) @doc
      (
      (PLUS)
      (STRING) @doc
      )*
    )*
  )
  (#strip! @doc "^\\\"|\\\"$")
) @definition.class

(class_definition
  (class_type
    optimization: (OPTIMIZATION)
  )
  (class_specifier
    identifier: (identifier) @name
    comment: (string_comment
      (STRING) @doc
      (
      (PLUS)
      (STRING) @doc
      )*
    )*
  )
  (#strip! @doc "^\\\"|\\\"$")
) @definition.optimization

(class_definition
  (class_type
    model: (MODEL)
  )
  (class_specifier
    identifier: (identifier) @name
    comment: (string_comment
      (STRING) @doc
      (
      (PLUS)
      (STRING) @doc
      )*
    )*
  )
  (#strip! @doc "^\\\"|\\\"$")
) @definition.model

(class_definition
  (class_type
    record: (RECORD)
  )
  (class_specifier
    identifier: (identifier) @name
    comment: (string_comment
      (STRING) @doc
      (
      (PLUS)
      (STRING) @doc
      )*
    )*
  )
  (#strip! @doc "^\\\"|\\\"$")
) @definition.record

(class_definition
  (class_type
    connector: (CONNECTOR)
  )
  (class_specifier
    identifier: (identifier) @name
    comment: (string_comment
      (STRING) @doc
      (
      (PLUS)
      (STRING) @doc
      )*
    )*
  )
  (#strip! @doc "^\\\"|\\\"$")
) @definition.connector

(class_definition
  (class_type
    type: (TYPE)
  )
  (class_specifier
    identifier: (identifier) @name
    comment: (string_comment
      (STRING) @doc
      (
      (PLUS)
      (STRING) @doc
      )*
    )*
  )
  (#strip! @doc "^\\\"|\\\"$")
) @definition.type

(class_definition
  (class_type
    package: (PACKAGE)
  )
  (class_specifier
    identifier: (identifier) @name
    comment: (string_comment
      (STRING) @doc
      (
      (PLUS)
      (STRING) @doc
      )*
    )*
  )
  (#strip! @doc "^\\\"|\\\"$")
) @definition.package

(class_definition
  (class_type
    function: (FUNCTION)
  )
  (class_specifier
    identifier: (identifier) @name
    comment: (string_comment
      (STRING) @doc
      (
      (PLUS)
      (STRING) @doc
      )*
    )*
  )
  (#strip! @doc "^\\\"|\\\"$")
) @definition.function

(class_definition
  (class_type
    uniontype: (UNIONTYPE)
  )
  (class_specifier
    identifier: (identifier) @name
    comment: (string_comment
      (STRING) @doc
      (
      (PLUS)
      (STRING) @doc
      )*
    )*
  )
  (#strip! @doc "^\\\"|\\\"$")
) @definition.uniontype
