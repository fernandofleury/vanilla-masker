describe("VanillaMasker.maskPattern", function() {

  it('throws error: "VanillaMasker: There is no element to bind." when element is undefined', function() {
    expect(function() {
      VMasker(undefined).maskPattern();
    }).toThrow(new Error('VanillaMasker: There is no element to bind.'));
  });

  it('throws error: "VanillaMasker: There is no element to bind." when element is null', function() {
    expect(function() {
      VMasker(null).maskPattern();
    }).toThrow(new Error('VanillaMasker: There is no element to bind.'));
  });

  it('throws error: "VanillaMasker: There is no element to bind." when element is blank', function() {
    expect(function() {
      VMasker("").maskPattern();
    }).toThrow(new Error('VanillaMasker: There is no element to bind.'));
  });

  it('does not throw error when element is empty array', function() {
    expect(function() {
      VMasker([]).maskPattern();
    }).not.toThrow();
  });

});

describe("VanillaMasker.toPattern", function() {

  it('returns "(61)" pattern when input is 61', function() {
    expect(VMasker.toPattern(61, '(99)')).toEqual('(61)');
  });

  it('returns "(61) 91234-5678" pattern when input is 61912345678', function() {
    expect(VMasker.toPattern(61912345678, '(99) 99999-9999')).toEqual('(61) 91234-5678');
  });

  it('returns "(10) 9991-1111" pattern when input is 1099911111', function() {
    expect(VMasker.toPattern(1099911111, '(99) 9999-9999')).toEqual('(10) 9991-1111');
  });

  it('returns "(10) 11" pattern when input is 1011', function() {
    expect(VMasker.toPattern('1011', '(99) 9999-9999')).toEqual('(10) 11');
  });

  it('returns "+10 11 4444-44" pattern when input is 1011444444', function() {
    expect(VMasker.toPattern('1011444444', '+99 99 9999-99')).toEqual('+10 11 4444-44');
  });

  it('returns "+1 (888) 888-8888" pattern when input is 8888888888', function() {
    expect(VMasker.toPattern('8888888888', '+1 (999) 999-9999')).toEqual('+1 (888) 888-8888');
  });

  it('returns "+1 (888) 888-8" pattern when input is 8888888', function() {
    expect(VMasker.toPattern('8888888', '+1 (999) 999-9999')).toEqual('+1 (888) 888-8');
  });
  it('returns "+1 (888) 888-8" pattern when input is +1 (888) 888-8', function() {
    expect(VMasker.toPattern('+1 (888) 888-8', '+1 (999) 999-9999')).toEqual('+1 (888) 888-8');
  });

  it('returns "12/12/2000" pattern when input is 12122000', function() {
    expect(VMasker.toPattern(12122000, '99/99/9999')).toEqual('12/12/2000');
  });

  it('returns "10/11" pattern when input is 1011', function() {
    expect(VMasker.toPattern('1011', '99/99/9999')).toEqual('10/11');
  });

  it('returns "2000/12/12" pattern when input is 20001212', function() {
    expect(VMasker.toPattern('20001212', '9999/99/99')).toEqual('2000/12/12');
  });

  it('returns "999.111.111-01" pattern when input is 99911111101', function() {
    expect(VMasker.toPattern(99911111101, '999.999.999-99')).toEqual('999.111.111-01');
  });

  it('returns "101.1" pattern when input is 1011', function() {
    expect(VMasker.toPattern('1011', '999.999.999-99')).toEqual('101.1');
  });

  it('returns "ABC-1234" pattern when input is ABC1234', function() {
    expect(VMasker.toPattern('ABC1234', 'AAA-1234')).toEqual('ABC-1234');
  });

  it('returns incomplete result: "AB" when input is AB1 and pattern is AAA-99', function() {
    expect(VMasker.toPattern('AB1', 'AAA-99')).toEqual('AB');
  });

  it('returns "9B.GR.D08X0.4.G.117974" pattern when input is 9BGRD08X04G117974', function() {
    expect(VMasker.toPattern('9BGRD08X04G117974', 'SS.SS.SSSSS.S.S.SSSSSS')).toEqual('9B.GR.D08X0.4.G.117974');
  });

  it('returns "BB.G" pattern when input is 9BG', function() {
    expect(VMasker.toPattern('BBG', 'SS.SS.SSSSS.S.S.SSSSSS')).toEqual('BB.G');
  });

  it('returns "(4xx) xxx-xxxx" when input is 4 and placeholder is x', function(){
    expect(VMasker.toPattern('4', {pattern: "(999) 999-9999", placeholder: "x"})).toEqual('(4xx) xxx-xxxx');
  });

  it('returns "(___) ___-_____" when input is empty and placeholder is _', function(){
    expect(VMasker.toPattern('', {pattern: "(999) 999-9999", placeholder: "_"})).toEqual('(___) ___-____');
  });

  it('returns "(111) 111-1111" when input is 1111111111 and placeholder is _', function(){
    expect(VMasker.toPattern('1111111111', {pattern: "(999) 999-9999", placeholder: "_"})).toEqual('(111) 111-1111');
  });

  it('returns "(aaa) _____" when input is aaa999aaaa and placeholder is _', function(){
    expect(VMasker.toPattern('aaa999aaaa', {pattern: "(AAA) AAAAA", placeholder: "_"})).toEqual('(aaa) _____');
  });

  it('returns "(61) 91234-5678" pattern with optional character when input is 61912345678', function() {
    expect(VMasker.toPattern(61912345678, '(99) 9?9999-9999')).toEqual('(61) 91234-5678');
  });

  it('returns "(61) 91234-5678" pattern with optional character when input is 619123456789', function() {
    expect(VMasker.toPattern(619123456789, '(99) 9?9999-9999')).toEqual('(61) 91234-5678');
  });

  it('returns "(10) 9991-1111" pattern with optional character when input is 1099911111', function() {
    expect(VMasker.toPattern(1099911111, '(99) 9?9999-9999')).toEqual('(10) 9991-1111');
  });

  it('returns "(10) 11" pattern with optional character when input is 1011', function() {
    expect(VMasker.toPattern('1011', '(99) 9?9999-9999')).toEqual('(10) 11');
  });

  it('returns "(10) 1234-1" pattern with optional character when input is 1012341', function() {
    expect(VMasker.toPattern('1012341', '(99) 9?9999-9999')).toEqual('(10) 1234-1');
  });

  it('returns "5-3" pattern with optional character when input is 53', function() {
    expect(VMasker.toPattern('53', '9?9-9?9')).toEqual('5-3');
  });

  it('returns "51-3" pattern with optional character when input is 513', function() {
    expect(VMasker.toPattern('513', '9?9-9?9')).toEqual('51-3');
  });

  it('returns "192.168.201" pattern with optional character when input is 192168201', function() {
    expect(VMasker.toPattern('1921682011', '9?99.9?99.9?99.9?99')).toEqual('192.168.201.1');
  });
});
