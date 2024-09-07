const randomstring = require("randomstring");
function generateResetToken(length)
{
return randomstring.generate({
    length: length,
    charset: 'alphabetic'
  });
}
module.export=generateResetToken