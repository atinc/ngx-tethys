---
category: feedback
title: Alert
subtitle: Alert
order: 1
---

<div class="dg-alert dg-alert-info">Alert component.</div>

## When To Use

- Show alert messages to users.
- Show static container that is not popover, users can choose to always show or manually close.


## Module Import
```
import { ThyAlertModule } from "ngx-tethys/alert";
```

## How To Use

Basic use as follows:
```
<thy-alert thyType="success" thyMessage="Well done! You successfully read this important alert message."></thy-alert>
```

Display of Results as follows：
<example name="thy-alert-basic-example" />


## thyAlertActionItem

Add custom action styles for alert content.

<example name="thy-alert-operation-example" />


