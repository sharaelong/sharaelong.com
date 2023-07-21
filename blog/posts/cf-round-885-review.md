---
title: 'Codeforces Round #885 (Div.2) Review'
summary: 'Chaos, with my first all solve'
date: 2023-07-19T22:00:00+09:00
---

I recently took part in the [codeforce round #885 (Div.2)](https://codeforces.com/contest/1848), which proved to be a challenging yet rewarding. I managed to solve every problem and achieved a personal best ranking - 11th place! Here's a brief recap of the round.

![Ta-da](/static/cf-round-885-result.png)

**A. Vika and Her Friends**  
The moment I finished reading problem A, my mind went blank. No solutions, intuitions or observations popped up. It was like a brick wall - was this really a Div2A problem? I had a feeling I was misread something. However, my understanding is exactly right! So I moved into example part. By observing it about a minute, realization dawned upon me. The crux of the problem lay in chessboard coloring and the fact that the board was finite. My hypothesis was simple - if anyone shared Vika's color square, the answer would be NO; otherwise, YES.

This problem nearly made me quit the contest. But, recalling a personal insight - 'a difficult contest for me is difficult for everyone' - I submitted my solution and got an AC! A quick glance at the AC count (only 52 at the time) reassured me that my insight was correct. **A AC (0:03:52, +0)**

### B. Vika and the Bridge
Although problem B was typical of Div2B difficulty, it had me stumped for about 15 minutes due to my confusion over the 'distance' definition. It ignored even the triangle inequality! It took me a while to understand that if I set the starting point as 0 and the destination point as $n+1$, the definition of 'distance' would become consistent. Fortunately, I didn't accumulate a WA penalty here. **B AC (0:17:44, +0)**

**C. Vika and Price Tags**  
By Problem C, my confidence was peaking. I had solved a similar problem before, albeit [a single number version](https://www.acmicpc.net/problem/1494). I scoured my previous problem-solving history, copied the relevant code, pasted it, and voila - done! This endeavor, however, took a significant chunk of time. I also found myself questioning whether there was a simple solution, since that single number version problem is rated in high tier with respect to [solved.ac](https://solved.ac) rating system which is almost equivalent to Div2F level. Nonetheless, it gave me a considerable advantage in the contest. **C AC (0:37:14, +0)**

**D. Vika and Bonuses**  
My initial understanding of Problem D was that I only needed to consider a maximum accumulation of 10 bonuses (precisely increase like arithmetic sequence). But it wasn't that simple. Except 0 and 5, bonuses can increase infinitely many times as far as we choose the second operation option (denoted as $x$). Then my guess was that the function for `$x$` would be convave upward, but I struggled with the cases when `$x$` wasn't exactly a multiple of 4. After about 10 minutes, I realized not the entire function was convex, but each `$x = 4k + r$` case was. Hooray! 

Nonetheless there were a few more obstacles. When `$s$` is odd number, process entered into even number case after a single operation but I didn't realize it at first. Moreover I had forgotten loop condition of the ternary search, so I had no choice but to do brute force near the optimum point. And even I made a compilation error for using `__int128` - which turned out to be unnecessary thing. But finally, an AC was mine. **D AC (1:05:19, +1)**

**F. Vika and Wiki**  
After D, I noticed more solvers had tackled F than E, so I moved on to F. Its statement was simple. It was too straightforward that I couldn't think of anything else to do except to find patterns by writing operation sequence by hand. A little later, I found that the answer is at most $n$, and that binary search was an option. If I find some way to simulate the state after `$k$` operations fast, then I'm done. I was able to find that way easily from my long and lengthy writings. `$O(n\log^2n)$` complexity was a little bit scary but it was enough to run in time limit. **F AC (1:31:16, +0)**

**E. Vika and Stone Skipping**  
After thoroughly reading the statement, writing down the equations, and considering subtle issues, Problem E seemed simple and direct. All it required was to track the factorization of the query number and the initial number. I feel nervous that it is too easy than regular Div2E difficulty. But my curiosity was resolved when I saw small range of modular `$M$`. I had just enough time left to implement everything. I focused as much as possible on coding, ...and finally I got AC when only 3 minutes left! **E AC (1:57:08, +0)**

## Conclusion
In this round, I only encountered one compilation error, with no WAs. It seems like I got a sort of 'returning user buff'. I was somewhat shaken by an announcement that the 15th test was incorrect, assuming it might turn the round unrated, given how well I was performing. But the round remained rated, and it was a tad disappointing that I wasn't able to fully commit to it during that uncertainty.

Anyway, I returned to the orange again. It looks like that GM, or IGM are pretty common, but even 'native' orange is still seems somewhat uncommon. For now, my focus is on maintaining my current rank rather than aiming for red (GM).

![return master;](/static/cf-round-885-rating-change.png)
