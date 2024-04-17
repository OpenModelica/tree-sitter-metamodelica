pure function foo
algorithm
  pure := foldExp(fn, function checkPureCall(fn = fn), true);
end foo;
