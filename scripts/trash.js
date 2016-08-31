import { CronJob } from 'cron';
import request from 'request';

export default ( robot => {

  const shigen = new CronJob(
    '00 00 8 * * 4', // 毎週木曜日
    () => {
      robot.send({room: '#z22_sharehouse'},
      `@channel
      今日は資源ごみの日です。
      ダンボールをとじて、ペットボトル、ビン、缶をまとめて、捨てましょう。
      http://www.illustkanban.com/3-5y-3.gif`);
    }
  );

  const moeru = new CronJob(
    '00 00 8 * * 2,5', // 毎週火曜金曜
    () => {
      robot.send({room: '#z22_sharehouse'},
      `@channel
      今日は燃えるごみの日です。
      袋をとじて、捨てましょう。ゴミ箱に新しい袋セットしておいてね :heart:
      http://blog-imgs-14-origin.fc2.com/h/i/k/hikikomorinikki/DSC00836.png`);
    }
  );

  const kinzoku = new CronJob(
    '00 30 7 * * 2', // 第1, 第3 月曜日 =>  1~7 or 15 ~ 21
    () => {
      let cal = new Date();
      let date = cal.getDate();

      if (1 <= date || date <= 7 || 15 <= date || date <= 21) {
        robot.send({room: '#z22_sharehouse'},
        `@channel
        今日は金属・陶器・ガラスごみの日です。
        きちんと分別して捨てましょう。
        http://img-cdn.jg.jugem.jp/f6b/961805/20081018_333047.jpg`);
      }
    }
  );

  const cronTasks = [shigen, moeru, kinzoku];
  cronTasks.forEach( task => task.start() );
})
