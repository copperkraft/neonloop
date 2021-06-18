// represents wall presence on left-top, right-top, left-bottom, right-bottom corners by 0 and 1

// TODO: Switch to numbers 0-15 representing bytes
export type WallCode =
  '0000' |
  '1000' |
  '0100' |
  '0001' |
  '0010' |
  '1100' |
  '0101' |
  '0011' |
  '1010' |
  '0110' |
  '1001' |
  '0111' |
  '1011' |
  '1110' |
  '1101' |
  '1111';
