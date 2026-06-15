---
layout: post
title: "From Scores to Decisions"
description: "A short note on why anomaly detection becomes more useful when scores are calibrated into decisions with stated error control."
date: 2026-06-15
author:
  - Oliver Hennhöfer
category: Notes
tags:
  - conformal inference
  - anomaly detection
  - research software
edition: folio 01
hero: /assets/img/research-signal.jpg
hero_alt: "Abstract signal visualization on paper"
---

Anomaly detectors often stop at a score. The score may rank observations in a useful way, but it does not say what level of evidence should trigger an action, nor how often that action is expected to be wrong under a stated reference condition.

Conformal inference is useful here because it gives a way to turn a score into a calibrated quantity. In anomaly detection, that often means converting a raw anomaly score into a p-value relative to calibration data. The resulting value is not magic, and it still depends on the assumptions behind the calibration set, but it gives the downstream decision a statistical meaning.

## The software boundary

For research software, I like the boundary where a library accepts the model's scores and returns calibrated evidence. That keeps the anomaly detector itself flexible: it can be a classical method, a neural model, or a domain-specific scoring rule. The calibration layer then handles the part that most ad hoc thresholds leave implicit.

This is the design direction behind `nonconform`: keep the scoring model separate, expose the calibration assumptions clearly, and make the final decision rule inspectable. In practical workflows, this tends to be more maintainable than treating every detector as a sealed system with its own thresholding convention.

## Sequential settings

The same issue appears when tests arrive over time. A single threshold can look reasonable in isolation and still behave poorly when repeated decisions accumulate. Online FDR procedures address that by controlling the error rate across a stream of hypotheses, adapting the available testing budget as evidence arrives.

The common thread is simple: scores are useful, but decisions need accounting. Good APIs should make that accounting visible.
