import { CronJob } from 'cron';
import cheerio from 'cheerio';
import { Iconv } from 'iconv';
import request from 'request';

export default ( robot => {
  const options = {
    url: 'http://takken.fx-ex.info/question.php',
    encoding: null
  }

  robot.hear(/問題出して$/i, msg => {
    getQuestion(options, (question) => {
      msg.send(question);
    });
  });


  const cron = new CronJob(
    '00 00 0-23 * * *',
    () => {

    getQuestion(options, (question) => {
      robot.send({room: '#tmp_takken'}, question);
    });
  });
  cron.start();
})

const getQuestion = (options, callback) => {
  const iconv = new Iconv('EUC-JP', 'UTF-8//TRANSLIT//IGNORE');

  request(options, (error, response, body) => {
    if(!error && response.statusCode == 200) {
      const buffer = new Buffer(body, 'binary');
      const text  = iconv.convert(buffer).toString();
      const $ = cheerio.load(text);
      const answer_links = $('ul li a').map(function() { return $(this).attr('href') }).slice(0, 2);
      callback(`
        @idaten1551 は必ず解いて答えをここに書いてください \n
        @idaten1551 は必ず宅建に受かってください. :fire: :fire: :fire:\n
        @idaten1551 は宅建に受からなかった場合、全裸オ◎ニーです.\n

        ${$('.daimon').text()} \n
        ${$('.shoumon').text()} \n

        :o: -> http://takken.fx-ex.info/${answer_links[0]}
        :x: -> http://takken.fx-ex.info/${answer_links[1]}
      `);
    }
  });
}
