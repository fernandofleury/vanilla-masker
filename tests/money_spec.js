describe("VanillaMasker.maskMoney", function() {

  it('throws error: "VanillaMasker: There is no element to bind." when element is undefined', function() {
    expect(function() {
      VMasker(undefined).maskMoney();
    }).toThrow(new Error('VanillaMasker: There is no element to bind.'));
  });

  it('throws error: "VanillaMasker: There is no element to bind." when element is null', function() {
    expect(function() {
      VMasker(null).maskMoney();
    }).toThrow(new Error('VanillaMasker: There is no element to bind.'));
  });

  it('throws error: "VanillaMasker: There is no element to bind." when element is blank', function() {
    expect(function() {
      VMasker("").maskMoney();
    }).toThrow(new Error('VanillaMasker: There is no element to bind.'));
  });

  it('does not throw error when element is empty array', function() {
    expect(function() {
      VMasker([]).maskMoney();
    }).not.toThrow();
  });

});

describe("VanillaMasker.toMoney", function() {

  it('returns the default money', function() {
    expect(VMasker.toMoney(10000000000)).toEqual('100.000.000,00');
  });

  it('returns 1.000,00 money when number is 1a0b0c000', function() {
    expect(VMasker.toMoney('1a0b0c000')).toEqual('1.000,00');
  });

  it('returns 0,00 money when number is 0', function() {
    expect(VMasker.toMoney(0)).toEqual('0,00');
  });

  it('returns 0,01 money when number is 1', function() {
    expect(VMasker.toMoney(1)).toEqual('0,01');
  });

  it('returns 0,10 default money number is 10', function() {
    expect(VMasker.toMoney(10)).toEqual('0,10');
  });

  it('returns 199,59 money when number is 199.59 with decimal', function() {
    expect(VMasker.toMoney(199.59)).toEqual('199,59');
  });

  it('returns 199,59 money when number is a string 199.59 with decimal', function() {
    expect(VMasker.toMoney('199.59')).toEqual('199,59');
  });

  it('returns 1.000,00 money when number is a string', function() {
    expect(VMasker.toMoney('100000')).toEqual('1.000,00');
  });

  it('returns 1.000 money when precision is 0', function() {
    expect(VMasker.toMoney(1000, {precision: 0})).toEqual('1.000');
  });

  it('returns R$ 10.000,00 when unit is R$', function() {
    expect(VMasker.toMoney(10000000000, {unit: 'R$'})).toEqual('R$ 100.000.000,00');
  });

  it('returns 100,000,000,00 when delimiter is ","', function() {
    expect(VMasker.toMoney(10000000000, {delimiter: ','})).toEqual('100,000,000,00');
  });

  it('returns 100.000.000.00 when separator is "."', function() {
    expect(VMasker.toMoney(10000000000, {separator: '.'})).toEqual('100.000.000.00');
  });

  it('returns 100.000.000,00 when zeroCents is true', function() {
    expect(VMasker.toMoney(100000000, {zeroCents: true})).toEqual('100.000.000,00');
  });

  it('returns -3,75 when showSignal is true and given a float value', function() {
    expect(VMasker.toMoney(-375, {showSignal: true})).toEqual('-3,75');
  });

  it('returns 3,75 when showSignal is false and given a float value', function() {
    expect(VMasker.toMoney(-375, {showSignal: false})).toEqual('3,75');
  });

  it('returns -3,75 when showSignal is true and given a string value', function() {
    expect(VMasker.toMoney('-375', {showSignal: true})).toEqual('-3,75');
  });

  it('returns 3,75 when showSignal is false and given a string value', function() {
    expect(VMasker.toMoney('-375', {showSignal: false})).toEqual('3,75');
  });

});
