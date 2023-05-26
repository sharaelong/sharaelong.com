---
title: 'Approximating the Conversion between Z-Scores and Percentiles'
summary: 'A simple method for calculating z-scores based on a 5% percentage basis'
date: 2023-05-27T01:50:00+09:00
---

There are well-known values associated with the normal distribution, such as $Pr(\left| Z \right| < 1.96) = 0.95$ or $Pr(\left| Z \right| < 2.58) = 0.99$. Sometimes, I wonder about questions like 'What is the percentile of $r\sigma$?' This led me to search for tricks to approximate the relationship between z-scores and percentiles. Recently, I discovered a relatively simple formula that generates $r$ satisfying:

`$$ Pr(Z < r) = p $$`

for every $p$ on a 5% percentage basis, except for extreme cases. The core of this formula involves two magic numbers: $0.12$ and $0.008$.

`$$
\begin{flalign*}
    &p = 0.50 \rightarrow r = 0 &\\
    &p = 0.55 \rightarrow r = 0.120 &\\
    &p = 0.60 \rightarrow r = 0.120 + 0.128 = 0.248 &\\
    &p = 0.65 \rightarrow r = 0.120 + 0.128 + 0.136 = 0.384 &\\
    &p = 0.70 \rightarrow r = 0.120 + 0.128 + 0.136 + 0.144 = 0.528 &\\
    &p = 0.75 \rightarrow r = 0.120 + 0.128 + 0.136 + 0.144 + 0.152 = 0.680 &\\
    &p = 0.80 \rightarrow r = 0.120 + 0.128 + 0.136 + 0.144 + 0.152 + 0.160 = 0.840 &\\
    &p = 0.85 \rightarrow r = 0.120 + 0.128 + 0.136 + 0.144 + 0.152 + 0.160 + 0.168 = 1.008 &\\
\end{flalign*}
$$`

For `$p < 0.5$`, the values are symmetric to the cases when `$p > 0.5$` and can be trivially derived from the above values. Starting from `$p = 0.90$`, the error becomes larger. Fortunately, these values are relatively common: `$ Pr(Z < 1.28) = 0.90 $`, `$ Pr(Z < 1.645) = 0.95 $`. If someone needs values for two-tailed distribution, i.e., `$ Pr(\left| Z \right| < r) = p $`, taking the average of the above table will yield a reasonable value.

However, this approximation lacks a theoretical basis. The area under the probability density function (PDF) of the normal distribution, derived from the Taylor expansion of a function using terms up to the second order, resembles a function of the form `$Ax + Bx^3 + Cx^5$`, whereas my formula is related to a quadratic polynomial. The inherent anomaly is connected to this issue.

I sincerely hope that someone discovers a more accurate approximation that shares a similar level of calculation complexity as this method. If you have, I'm happy to get in contact and discuss it further!
