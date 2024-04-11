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

  extras: $ => [
    $.COMMENT,
    $.BLOCK_COMMENT,
    $._SPACE
  ],

  word: $ => $.IDENT,

  rules: {
    ...require("./rules/a1-classAndMainGrammar"),
    ...require("./rules/a2-extends"),
    ...require("./rules/a3-modification"),
    ...require("./rules/a4-equations"),
    ...require("./rules/a5-expressions"),
    ...require("./rules/a6-metamodelicaExtensions"),
    ...require("./rules/keywords"),
    ...require("./rules/lexicalConventions"),

    //CODE: $ => "undefined",
    //EQUALITY: $ => "undefined",
    //class_definition: $ => "foo0",
    //class_modification: $ => "foo1",
    //string_comment: $ => "foo2",
    //type_specifier: $ => "foo3",
    //comment: $ => "foo4",
    //type_prefix: $ => "foo5",
    //initial_equation_clause: $ => "foo6",
    //initial_algorithm_clause: $ => "foo7",
    //equation_clause: $ => "foo8",
    //constraint_clause: $ => "foo9",
    //algorithm_clause: $ => "foo10",
    //component_reference: $ => "foo11",
    //expression_list: $ => "foo12",
    //annotation: $ => "foo13",
    //extends_clause: $ => "foo14",
    //component_clause: $ => "foo15",
    //constraining_clause_comment: $ => "foo16",
    //name_path_star: $ => "foo17",
  }
});
