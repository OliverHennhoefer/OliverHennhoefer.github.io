---
layout: page
title: Research
permalink: /research/
---

My research focuses on statistically principled machine learning systems for uncertain and dynamic environments.

## Conformal Anomaly Detection

Anomaly detectors often produce scores without calibrated uncertainty. I study conformal methods that convert such scores into p-values and enable principled decisions with error control. Recent work includes leave-one-out, bootstrap, and cross-conformal anomaly detectors.

## Low-Data and Shifted Settings

Real data often violate the clean exchangeability assumptions behind standard conformal methods. I am interested in weighted and adaptive conformal procedures that remain useful under data scarcity, local non-stationarity, and distribution shift.

## Online Error Control

Many applications require decisions while data arrive sequentially. I work with online false discovery rate control and related sequential testing procedures for settings where discoveries need to be made before the full dataset exists.

## Research Software

I build Python libraries around these ideas, including [`nonconform`](https://github.com/OliverHennhoefer/nonconform) for conformal anomaly detection and [`online-fdr`](https://github.com/OliverHennhoefer/online-fdr) for online multiple testing.
