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

// Builtin types and functions
//
// From Towards Modelica 4 Meta-Programming and Language Modeling with MetaModelica 2.0
// Section 5.1.2 Predefined Types and Type Constructors
// https://liu.diva-portal.org/smash/record.jsf?pid=diva2%3A418188&dswid=-9758

module.exports = {

  _builtin_types: $ => choice(
    $.T_REAL,
    $.T_INTEGER,
    $.T_BOOLEAN,
    $.T_STRING,
    $.T_LIST,
    $.T_OPTION,
    $.T_TUPLE,
    $.T_SEQUENCE,
    $.T_ANY,
  ),

  // Types
  T_REAL: $ => "Real",
  T_INTEGER: $ => "Integer",
  T_BOOLEAN: $ => "Boolean",
  T_STRING: $ => "String",

  T_LIST: $ => "List",
  T_OPTION: $ => "Option",
  T_TUPLE: $ => "Tuple",
  T_SEQUENCE: $ => "Sequence",
  T_ANY: $ => "Any",
};
