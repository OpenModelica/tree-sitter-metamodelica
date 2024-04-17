package A "Package"
  function foo
  end foo;

  function bar
  algorithm
    foo();    // In scope
  end bar;
end A;

package B
  function bar1
      Real x;
    algorithm
      x := foo();   // Not in scope
      x := A.foo(); // In scope
  end bar1;

  function bar2
      Real y;
    algorithm
      show(x);    // Not in scope
      show(y);    // In scope
  end bar2;
end B;
