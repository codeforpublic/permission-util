const { extractInfo, match } = require('./util');

describe('match', () => {
  it('should match exact text [data:demographic:dob]', () => {
    const result = match('data:demographic:dob', 'data:demographic:dob');
    expect(result).toEqual(true);
  });
  it('should match [*]', () => {
    expect(match('data:demographic:dob', 'data:demographic:*')).toEqual(true);
    expect(match('data:demographic:dob', 'data:*')).toEqual(true);
    expect(match('data:xxx', 'data:*')).toEqual(true);
    expect(match('_data:xxx', 'data:*')).toEqual(false);
  });
  it('should match [location:*]', () => {
    expect(match('location:xxx', 'location:*')).toEqual(true);
    expect(match('data:xxx', 'location:*')).toEqual(false);
    expect(match('_location:xxx', 'location:*')).toEqual(false);
  });
});

describe('util', () => {
  const EXAMPLE_DATA = {
    'data:demographic:dob': '1995-04-30',
    'data:demographic:gender': 'M',
    'data:demographic:nationality': 'Thai',
    'data:id:firstname': 'S',
    'data:id:lastname': 'A',
    'data:id:nationalId': '1111100000111',
    'data:id:mobile': '0901234123',
    'data:id:email': 'we_are_hiring@cleverse.com',
    'location:xxx': 'xxx',
    'location:yyy:zzz': 'xxx',
    'location:ttt': 'xxx',
  };
  it('should handle [data:*]', () => {
    const result = extractInfo(EXAMPLE_DATA, ['data:*']);
    expect(result).toEqual({
      'data:demographic:dob': '1995-04-30',
      'data:demographic:gender': 'M',
      'data:demographic:nationality': 'Thai',
      'data:id:firstname': 'S',
      'data:id:lastname': 'A',
      'data:id:nationalId': '1111100000111',
      'data:id:mobile': '0901234123',
      'data:id:email': 'we_are_hiring@cleverse.com',
    });
  });
  it('should match exact text [data:demographic:dob]', () => {
    const result = extractInfo(EXAMPLE_DATA, ['data:demographic:dob']);
    expect(result).toEqual({ 'data:demographic:dob': '1995-04-30' });
  });
  it('should match exact text (multi) [data:demographic:dob, location:xxx]', () => {
    const result = extractInfo(EXAMPLE_DATA, ['data:demographic:dob', 'location:xxx']);
    expect(result).toEqual({
      'data:demographic:dob': '1995-04-30',
      'location:xxx': 'xxx',
    });
  });
});
