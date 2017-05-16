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
});

describe("VanillaMasker.unmaskPattern", function() {

  it('unmasks the masked value "(61)" to 61', function() {
    expect(VMasker.unmaskPattern('(61)', '(99)')).toEqual('61');
  });

  it('unmasks the masked value "(61) 91234-5678" to 61912345678', function() {
    expect(VMasker.unmaskPattern('(61) 91234-5678', '(99) 99999-9999')).toEqual('61912345678');
  });

  it('unmasks the masked value "(10) 9991-1111" to 1099911111', function() {
    expect(VMasker.unmaskPattern('(10) 9991-1111', '(99) 9999-9999')).toEqual('1099911111');
  });

  it('unmasks the masked value "(10) 11" to 1011', function() {
    expect(VMasker.unmaskPattern('(10) 11', '(99) 9999-9999')).toEqual('1011');
  });

  it('unmasks the masked value "+10 11 4444-44" to 1011444444', function() {
    expect(VMasker.unmaskPattern('+10 11 4444-44', '+99 99 9999-99')).toEqual('1011444444');
  });

  it('unmasks the masked value "12/12/2000" to 12122000', function() {
    expect(VMasker.unmaskPattern('12/12/2000', '99/99/9999')).toEqual('12122000');
  });

  it('unmasks the masked value "10/11" to 1011', function() {
    expect(VMasker.unmaskPattern('10/11', '99/99/9999')).toEqual('1011');
  });

  it('unmasks the masked value "2000/12/12" to 20001212', function() {
    expect(VMasker.unmaskPattern('2000/12/12', '9999/99/99')).toEqual('20001212');
  });

  it('unmasks the masked value "999.111.111-01" to 99911111101', function() {
    expect(VMasker.unmaskPattern('999.111.111-01', '999.999.999-99')).toEqual('99911111101');
  });

  it('unmasks the masked value "101.1" to 1011', function() {
    expect(VMasker.unmaskPattern('101.1', '999.999.999-99')).toEqual('1011');
  });

  it('unmasks the masked value "ABC-1234" to ABC', function() {
    expect(VMasker.unmaskPattern('ABC-1234', 'AAA-1234')).toEqual('ABC');
  });

  it('returns incomplete result: "AB" when input is AB and pattern is AAA-99', function() {
    expect(VMasker.unmaskPattern('AB', 'AAA-99')).toEqual('AB');
  });

  it('unmasks the masked value "9B.GR.D08X0.4.G.117974" to 9BGRD08X04G117974', function() {
    expect(VMasker.unmaskPattern('9B.GR.D08X0.4.G.117974', 'SS.SS.SSSSS.S.S.SSSSSS')).toEqual('9BGRD08X04G117974');
  });

  it('unmasks the masked value "BB.G" to BBG', function() {
    expect(VMasker.unmaskPattern('BB.G', 'SS.SS.SSSSS.S.S.SSSSSS')).toEqual('BBG');
  });

  it('unmasks the masked value "(4xx) xxx-xxxx" to 4 when the placeholder is x', function(){
    expect(VMasker.unmaskPattern('(4xx) xxx-xxxx', {pattern: "(999) 999-9999", placeholder: "x"})).toEqual('4');
  });

  it('unmasks the masked value "(___) ___-_____" to empty when the placeholder is _', function(){
    expect(VMasker.unmaskPattern('(___) ___-____', {pattern: "(999) 999-9999", placeholder: "_"})).toEqual('');
  });

  it('unmasks the masked value "(111) 111-1111" to 1111111111 when the placeholder is _', function(){
    expect(VMasker.unmaskPattern('(111) 111-1111', {pattern: "(999) 999-9999", placeholder: "_"})).toEqual('1111111111');
  });

  it('unmasks the masked value "(aaa) _____" to aaa999aaaa when the placeholder is _', function(){
    expect(VMasker.unmaskPattern('(aaa) _____', {pattern: "(AAA) AAAAA", placeholder: "_"})).toEqual('aaa');
  });
});
