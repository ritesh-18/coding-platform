const lines = require('fs').readFileSync(0, 'utf8').split('\n');
const nums = lines[0].trim().split(/\s+/).map(Number);
const target = Number(lines[1].trim());
const seen = new Map();
for (let i = 0; i < nums.length; i++) {
  const need = target - nums[i];
  if (seen.has(need)) { console.log(seen.get(need) + ' ' + i); break; }
  seen.set(nums[i], i);
}
