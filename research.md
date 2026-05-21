---
layout: page
title: Research
permalink: /research/
---

My research focuses on statistically principled machine learning systems for uncertain and dynamic environments.

## Uncertainty Quantification

I work on uncertainty quantification methods that make model outputs statistically interpretable. A central tool is conformal inference: a model-agnostic framework for calibrating predictions, scores, and decisions with explicit error guarantees under stated assumptions. I am especially interested in how these guarantees behave when data are limited, shifted, or observed sequentially.

## Conformal Anomaly Detection

Anomaly detectors often produce scores without calibrated decisions. I study conformal methods that convert such scores into p-values and enable principled outlier detection with error control. Recent work includes leave-one-out, bootstrap, and cross-conformal anomaly detectors, plus implementation-oriented work around `nonconform`, a Python package for conformal anomaly detection workflows.

## Low-Data and Shifted Settings

Real data often violate the clean exchangeability assumptions behind standard conformal methods. I am interested in weighted and adaptive conformal procedures that remain useful under data scarcity, local non-stationarity, and distribution shift. Current work on weighted conformal anomaly detection studies the trade-off between local adaptation, effective sample size, tail resolution, and variance.

## Online Error Control

Many applications require decisions while data arrive sequentially. I work with online false discovery rate control and related sequential testing procedures for settings where discoveries need to be made before the full dataset exists. This includes online FDR and FWER procedures for streaming hypothesis tests, such as high-throughput screening, experimentation, and monitoring systems.

## Research Software

I build Python libraries around these ideas, including [`nonconform`](https://github.com/OliverHennhoefer/nonconform) for conformal anomaly detection and [`online-fdr`](https://github.com/OliverHennhoefer/online-fdr) for online multiple testing. The emphasis is on clear APIs, reproducible benchmark code, and documented assumptions behind each statistical guarantee.
