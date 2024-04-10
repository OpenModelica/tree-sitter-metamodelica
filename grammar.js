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
    ...require("./rules/a0-lexicalConventions"),
    ...require("./rules/a1-classAndMainGrammar"),
    ...require("./rules/a2-extends"),
    ...require("./rules/a3-modification"),
    ...require("./rules/keywords"),

    name_path: $ => "undefined",
    DER: $ => "undefined",
    CODE: $ => "undefined",
    EQUALITY: $ => "undefined",
    INITIAL: $ => "undefined",
    class_modification: $ => "undefined",
    string_comment: $ => "undefined",
    type_specifier: $ => "undefined",
    type_prefix: $ => "undefined",
    initial_equation_clause: $ => "undefined",
    initial_algorithm_clause: $ => "undefined",
    equation_clause: $ => "undefined",
    constraint_clause: $ => "undefined",
    algorithm_clause: $ => "undefined",
    element_list: $ => "undefined",
    component_reference: $ => "undefined",
    expression_list: $ => "undefined",
    annotation: $ => "undefined",
    importClause: $ => "undefined",
    extendsClause: $ => "undefined",
    component_clause: $ => "undefined",
    constraining_clause_comment: $ => "undefined",
    name_path_star: $ => "undefined",
    expression: $ => "undefined",
    array_subscripts: $ => "undefined",
    modification: $ => "undefined",
  }
});
