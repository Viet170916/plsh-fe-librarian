export function getPreviousDaysNames(){
  const today = new Date();
  const dayNames = [ "CN", "T2", "T3", "T4", "T5", "T6", "T7" ];
  const dateFormat = new Intl.DateTimeFormat( "vi-VN", { day: "2-digit", month: "2-digit", year: "2-digit" } );
  const previousDays = [];
  for( let i = 9; i >= 0; i-- ){ // Bắt đầu từ 9 ngày trước để kết quả theo thứ tự tăng dần
    const date = new Date( today );
    date.setDate( today.getDate() - i );
    const formattedDate = dateFormat.format( date );
    const dayName = dayNames[ date.getDay() ];
    previousDays.push( `${ dayName }\n(${ formattedDate })` );
  }
  return previousDays;
}