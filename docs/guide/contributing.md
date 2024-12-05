---
title: 贡献指南
path: 'contributing'
order: 50
---

这篇指南会指导你如何为`ngx-tethys`贡献一份自己的力量，请在你要提 issue 或者 pull request 之前花几分钟来阅读一遍这篇指南。

## 行为准则

我们有一份 [行为准则](https://github.com/atinc/ngx-tethys/blob/master/CODE_OF_CONDUCT.md)，希望所有的贡献者都能遵守，请花时间阅读一遍全文以确保你能明白哪些是可以做的，哪些是不可以做的。

## 透明的开发

我们所有的工作都会在[T01 Infrastructure项目下的 ngx-tethys](https://at.pingcode.com/agile/projects/5e75e55dc9ecce3484ed21f0/kanban/5e75ee11c93dc84d996a0c92)看板上，不管是核心团队的成员还是外部贡献者的 pull request 都需要经过同样流程的 Review。

## 缺陷

我们使用 PingCode 看板来做缺陷追踪。
在你报告一个缺陷之前，请先确保已经搜索过已有的工作项和阅读了我们的常见问题。

## 新增功能
如果你有改进我们的 API 或者新增功能的想，直接在看板中添加一个工作项，并详细描述一下你的需求和使用场景。

## 第一次贡献
为了能帮助你开始你的第一次尝试，我们用 Good First Issue 标记了一些比较比较容易修复的缺陷和小功能。这些 Issue 可以很好地做为你的首次尝试。

如果你打算开始处理一个 Issue，请先检查一下 Issue 下面的留言以确保没有别人正在处理这个 Issue。如果当前没有人在处理的话你可以分配给自己并留言告知其他人你将会处理这个 Issue，以免别人重复劳动。

如果之前有分配者并留言说会处理这个 Issue 但是一两个星期都没有动静，那么你也可以接手处理这个 Issue，当然还是需要留言告知其他人。

## 贡献代码
ngx-tethys 团队会关注所有的 Pull Request，我们会 Code Review 以及合并你的代码，也有可能要求你做一些修改或者告诉你我们为什么不能接受这样的修改。

在你发送 Pull Request 之前，请确认你是按照下面的步骤来做的：

1. 在项目根目录下运行了 `npm install`
1. 如果你修复了一个缺陷或者新增了一个功能，请确保写了相应的单元测试，这很重要
1. 确认所有的测试都是通过的 `npm run test`。
1. 确保你的代码通过了 lint 检查 `npm run lint`。
1. 确保你的代码在提交之前经过了正确的 [Rebase](https://www.digitalocean.com/community/tutorials/how-to-rebase-and-update-a-pull-request)。
1. 确保你的提交信息符合我们的 [Commit 规范](https://at.pingcode.com/wiki/spaces/5e6b391d48453503714bea3e/pages/5e7088fa0909b20a485572e8)。

## 如何提出 Pull Request

1. 克隆项目 `git clone https://github.com/atinc/ngx-tethys`
1. 拉取最新代码 `git pull`
1. 创建一个 Feature 分支 (例如有一个分支叫 `feat-add-button`): `git checkout -b feat-add-button`
1. 在 `feat-add-button` 分支运行: `git rebase origin/master`（非必须）
1. 在 `feat-add-button` 分支修改代码，并 commit: `git commit -a 按照 Commit 规范进行填写`
1. 切换到你要工作的 Feature 分支 (例如有一个分支叫 `feat-add-button`): `git checkout feat-add-button`
1. 切换到你要工作的 Feature 分支推送代码 `git push origin` (可能需要 -f)
1. 在 Github 上发起 Pull Request 请求
