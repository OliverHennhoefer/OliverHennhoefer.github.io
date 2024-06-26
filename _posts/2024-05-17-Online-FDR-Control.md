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
corresponding null hypothesis $$H_{\text{0}}$$ is correct (i.e. that there is no effect and the 
initial hypothesis does not hold).

Problems arise when dozens up to millions of such (hypothesis) tests are conducted simultaneously.
In this scenario, the chance to observe a statistically significant result by mere chance increases
with the number of tests conducted. Given a significance level of $$\alpha=0.05$$ and $100$ simultaneous
tests, the number of committing _Type I_ errors will be $$100 * 0.05 = 5$$ as _p_-values under
$$H_{\text{0}}$$ are uniformly distributed [0,1] and a _p_-value of 0.05 naturally has a 5% chance for turning
out to be a _Type I_ error.

The described problem is referred to as the _multiple testing problem_ with several existing methods
that try to control either the stricter _FWER_ (family-wise error rate) or the _FDR_ (false discovery
rate). While the FWER describes the probability to make _at least_ one _false discovery_, the FDR
describes the proportion of false discoveries in proportion to the entirety of declared discoveries.

\begin{equation}
   FWER = 1-(1-\alpha)^{p}\ge\alpha
\end{equation}

\begin{equation}
   FDR = \frac{\text{False Positives}}{\text{False Positives + True Positives}}
\end{equation}

One of the most popular methods for controlling the FDR is the _Benjamini-Hochberg Procedure_.

# Online FDR-Control

As traditional methods for controlling either the FDR or the FWER are only applicable _batch-wise_
(i.e. the _p_-values have to be known), modern _streaming_ (or _online_) scenarios for hypothesis
testing require different kind of methods that are able to handle subsequently observed _p_values.

## Alpha-Investing

The first method for controlling error rates online was _alpha investing_ by
[Foster and Stine, 2008](https://rss.onlinelibrary.wiley.com/doi/abs/10.1111/j.1467-9868.2007.00643.x)
with _generalized alpha investing_ (_GAI_) later proposed by [Aharoni and Rosset, 2014](https://www.jstor.org/stable/24774568).

Any rules as derived from _GAI_ start with an initial _error budget_ (or _alpha wealth_) that gets
gradually allocated towards the different hypotheses tests. Every time a hypothesis gets tested, a
certain amount of _alpha_ is _invested_ into the hypothesis. In case the observed _p_-value turns out
to be statistically significant, _alpha wealth_ is earned back, adding to the overall _error budget_.
In case $$H_{\text{0}}$$ is not rejected, the _investment_ is lost, reducing the available budget.
In any case, the available _alpha budget_ can not fall to zero.<br>
The intuition behind this approach is that the denominator in the _FDP_ (False Discovery Proportion)
increases for every rejection ($$H_{\text{1}}$$ is accepted) alongside the _error budget_. With that,
the numerator (i.e. the number of false discoveries/rejections) may also increase, while still
controlling the FDR for future tests.

\begin{equation}
   FDP = \frac{\text{False Positives}}{\text{True Positives + False Positives}}
\end{equation}

\begin{equation}
   FDR = \mathbb{E}(\text{FDR}(T))
\end{equation}

Following the procedure described, _GAI_ results in a growing series of test levels
$${\alpha_{1}}, {\alpha_{2}}, {\alpha_{3}}, ...$$ to determine corresponding decision
towards $${R{1}}, {R{2}}, {R{3}}, ...$$ the statistical significance of an observation.
Within the online setting, a future decision $${R{t}}$$ (and $${\alpha_{t}}$$) can only be made
based on $$R_{1}, R_{2}, ... R_{t-1}$$. At each point in time $$t$$ the available _alpha wealth_
$$W(t)$$ decreases by $$\phi_{t}$$. As hypotheses $$H_{t}$$ are rejected ($$R_{t}=1$$),
the _alpha wealth_ increases by $$\varphi_{t}$$. With that the initial wealth is continuously
updated as:

\begin{equation}
   W(t) = W(t-1) - \phi_{t} + R_{t\varphi t}
\end{equation}

Within the given constraint, $$\alpha_{t}\text{,} \phi_{t} \text{and} \varphi_(t)$$ can be 
freely defined. Following the initial _alpha investing_ rule given in 
[Foster and Stine, 2008](https://rss.onlinelibrary.wiley.com/doi/abs/10.1111/j.1467-9868.2007.00643.x),
the variables are chosen as

\begin{equation}
   \alpha_{t} = \frac{\phi_{t}}{1 + \phi_{t}}, \phi_{t} \le W(t-1)
\end{equation}

\begin{equation}
   \varphi_{t} = \phi_{t} + \alpha
\end{equation}

Particular definitions come with different trade-offs and implications, as discussed in [Aharoni and Rosset, 2014](https://www.jstor.org/stable/24774568).

## LORD, SAFFRON and ADDIS

The _LORD_ algorithms was proposed by
[Javanmard and Montanari, 2018](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7615519/#R1)
and represents a _monotone_ GAI rule. Given an _infinite non-increasing_ sequence of positive
constants $${\gamma_{t}}^\infty_{t=1}$$ that sums up to $$1$$ the test levels $$\alpha{t}$$ for LORD
are chosen as:

\begin{equation}
   \alpha_{t} = w_{0} \gamma_{t} + \sum_{j:\tau_{j} \lt t, \tau_{j} \neq \mathbb{1}} \gamma_{t-\tau_{j}}b_{0}
\end{equation}

where $$\tau_{j}$$ denotes the \textit{j}th rejection with $$w_{0} + b_{0} \le \alpha$$ in order to
control the FDR.

# References

[1] Foster, D. and Stine R. (2008). Alpha-Investing: 
A Procedure for Sequential Control of Expected False Discoveries.
Journal of the Royal Statistical Society (Series B), 29(4):429-444.<br>
[2] Aharoni, E. and Rosset, S. (2014). Alpha-Investing:
Definitions, Optimality Results and Applications to Public Databases.
Journal of the Royal Statistical Society (Series B), 76(4):771–794.<br>
[3] Javanmard, A., and Montanari, A. (2018).
Online Rules for Control of False Discovery Rate and False Discovery Exceedance.
Annals of Statistics, 46(2):526-554.<br>
