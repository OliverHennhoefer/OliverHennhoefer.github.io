---
layout: post
title: Online FDR-Control
usemathjax: true
---

# Introduction

Statistical hypothesis testing is a fundamental part of _statistical inference_ in order
to determine whether the data at hand supports a particular hypothesis made. Respective tests
typically compute some kind of _test statistic_ that can eventually be translated to a
_p_-value, describing how likely the respective test result is under the assumption that the
corresponding null hypothesis $H_{\text{0}}$ is correct (i.e. that there is no effect and the 
initial hypothesis does not hold).

Problems arise when dozens up to millions of such (hypothesis) tests are conducted simultaneously.
In this scenario, the chance to observe a statistically significant result by mere chance increases
with the number of tests conducted. Given a significance level of $\alpha=0.05$ and 100 simultaneous
tests, the number of committing _Type I_ errors will be $100 * 0.05 = 5$ as _p_-values under
$H_{\text{0}}$ are uniformly distributed [0,1] and a _p_-value of 0.05 still has a 5% chance turning
out to be a _Type I_ error.

The described problem is referred to as the _multiple testing problem_ with several existing methods
that try to control either the stricter _FWER_ (family-wise error rate) or the _FDR_ (false discovery
rate). While the FWER describes the probability to make _at least_ one _false discovery_, the FDR
describes the proportion of false discoveries in proportion to the entirety of declared discoveries.

$FWER = 1-(1-\alpha)^{p}\ge\alpha$
$FDR = \frac{False Positive}{False Positive + True Positives}$



