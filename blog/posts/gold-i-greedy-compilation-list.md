---
title: 'Gold I Greedy Compilation List'
summary: ''
date: 2024-04-07T11:00:00+09:00
---

Gold I 문제들 중에서도 Greedy 문제들에 대한 풀이/증명을 전부 적어보려는 기획을 시도 중이다. 이걸 시작한 이유는,
1. 보통 greedy가 동일 티어 대비 어렵고,
2. Proof-by-AC를 좀 줄여보고자 하며,
3. 직관력을 기르는 데 도움이 될 것 같음

정도의 이유가 있다. 모든 종류의 피드백은 밑의 메일 주소나 discord DM으로 받을 예정.

[[BOJ 10310] Most](https://boj.kr/10310)
<details>
<summary>Solution</summary>
각 칸을 land와 water라고 부르자. 왼쪽의 어느 land과 오른쪽의 어느 land 하나를 잡아 이 둘을 잇는 경로를 생각하자. 이것이 최적해라고 하자. 만약 경로 중간에 새로운 land를 거치는 경우, 시작점이나 끝점 중 하나를 그 land로 바꾸면 더 짧은 경로가 나오므로, 최적해는 시작점과 끝점을 제외하면 모두 river를 지나는 경로이다. 또한 왼쪽 land의 좌표를 $(x_1, y_1)$이라 하고, 오른쪽을 $(x_2, y_2)$라고 하면, 두 지점을 잇는 최단경로로 다리를 메우는 것이 최적이다. 이 때 필요한 bridge의 개수는 $|x_1-x_2|+|y_1-y_2|-1$개이다.

문제의 조건 상, river의 left boundary 전체가 right boundary보다 왼쪽이므로, 항상 $x_1 \leq x_2$이며, 또한 $x_1$은 $y=y_1$ row의 river 바로 왼쪽 land, $x_2$는 $y=y_2$ row의 river 바로 오른쪽 land일 때 최적임을 알 수 있다. 따라서 $y_1 \leq y_2$인 case와 $y_1 > y_2$인 case를 분리해서 각각 계산해주면 되며, 이는 입력을 한 줄씩 받으면서 left boundary 칸들의 $x+y$ 최댓값, right boundary 칸들의 $y-x$ 최댓값을 관리해나가면 된다. 즉 $i$번째 row를 처리할 때 $1$번째부터 $i-1$번째 row의 값과 계산을 합치는 것이다.
</details>

[[BOJ 9509] Interstellar Trade](https://boj.kr/9509)
<details>
<summary>Official Solution</summary>
공식 정답 코드가 있어서, 코드를 보고 내가 해석한 결과를 적는다. 다른 해석이 있다면 모르겠는데, 개인적으로는 하늘에서 뚝 떨어진 motivation처럼 느껴진다.

WLOG $x_1 \leq x_2 \leq \ldots \leq x_n$라고 하자. 웜홀의 양 끝 점이 $a \leq b$라고 하자. $k$를 $x_k \leq \frac{x_1+x_n}{2}$인 최댓값으로 정의하자. 이 때, 이 문제의 답은 $\max(x_k-x_1, x_n-x_{k+1})$임을 증명할 것이다. WLOG $x_k-x_1 \geq x_n-x_{k+1}$라고 가정한다.

- 이 답을 가지는 웜홀 배치가 존재함을 먼저 보인다. $a = \frac{x_1+x_k}{2}$, $b = \frac{x_{k+1}+x_n}{2}$로 두면 된다. 그러면 $x_1 \Leftrightarrow x_k$의 이동이 최대 거리를 가지는 이동이 됨을 쉽게 보일 수 있다.

- 또한 이 값보다 최대 거리가 작아질 수 있는 웜홀 배치가 없음을 보이자. $a \geq \frac{x_1+x_n}{2}$이거나 $b \leq \frac{x_1+x_n}{2}$인 경우 반드시 이동 거리가 $\frac{x_1+x_n}{2} > x_k-x_1$ 이상이 되는 점 pair가 생기므로 불가능하다. 따라서 $a \leq \frac{x_1+x_n}{2} \leq b$이고, $x_1 \Leftrightarrow x_k$의 이동 거리가 짧아져야 하므로, 이들은 반드시 웜홀을 통한 이동으로 이득을 보아야 한다. 즉 $x_k-a \geq b-x_k$도 성립. 그러나 이 경우 $x_k \Leftrightarrow x_n$ 이동이 웜홀로 볼 수 있는 이동 거리의 이득이 사라지므로, $x_n-x_k \geq \frac{x_1+x_n}{2}$여서 모순.
</details>

[[BOJ 13027] Clique Problem](https://boj.kr/13027)
<details>
<summary>Solution</summary>
WLOG $x$ 기준으로 점들이 정렬되어있음을 가정한다. 부분그래프 $C$가 고른 index들이 $i_1 < i_2 < \ldots < i_{|C|}$라고 하자. 핵심적인 관찰은 $w_{i_k} + w_{i_{k+1}} \leq x_{i_{k+1}}-x_{i_k}$가 $1 \leq k < |C|$에 대해서 성립하기만 하면 임의의 두 점이 연결될 조건이 만족된다는 것이다. 그러므로 순서대로 점들을 읽어나갈 때 가장 마지막으로 $C$에 포함시키기로 한 점만 확인하면 되므로, dp를 적용할 수 있다. 마지막으로 $C$에 포함된 점이 $j$이고 현재 보는 점이 $i > j$일 때 연결 조건은 $x_j+w_j \leq x_i-w_i$이므로, LIS 문제와 비슷하게 접근이 가능하다.

`dp[i]`를 $i$를 마지막으로 포함하는 부분그래프의 최대 크기로 정의하고, `lb[i]`를 $dp[j]=i$인 $1 \leq j \leq i$ 중 $x_j+w_j$의 최솟값으로 정의하자. LIS를 풀 때처럼 $i$번째 점을 처리할 때 $x_i-w_i$에 대한 `upper_bound` 위치의 값과 $x_i+w_i$ 중 더 작은 값으로 갱신하는 작업을 반복하면 $lb$의 monotonicity가 항상 유지된다. 왜냐하면 $x_j+w_j \leq x_i-w_i < x_i+w_i$가 성립하기 때문.
</details>

[[BOJ 2278] 그래프 복원](https://boj.kr/2278)
<details>
<summary>Solution</summary>
지문에는 명시되어 있지 않으나, 복원한 그래프에 multiedge가 있으면 WA로 처리된다고 한다. 다만 이러한 점을 제외하더라도, 복원 가능하다면 multiedge가 없는 그래프로도 복원이 가능함으로 이러한 경우만 고려하자.

먼저 자명한 경우부터 고려한다. 최단거리는 metric이므로, metric의 조건이 만족되지 않는 input은 미리 복원 불가능 판정을 내려둬야 한다. 입력으로 주어지는 $i$와 $j$ 사이의 최단거리를 $d_{ij}$라고 쓰자. 여기서 가능한 모든 조합 $1 \leq i, j, k \leq n$에 대해 $d_{ij} > d_{ik} + d_{kj}$인 경우가 존재하면 항상 복원 불가능이다.

이제는 위의 조건을 만족하는 입력만 고려할 수 있다. 이 경우, $1 \leq i < j \leq n$인 모든 정점 쌍에 대해 $i$와 $j$ 사이에 $d_{ij}$ 길이의 간선이 있는 그래프는 항상 조건을 만족한다. 이 그래프의 간선 집합을 $E$라고 하자. 그러나 이 경우 $|E| = \binom{n}{2}$로 비효율적이다. 따라서 조건을 만족하는 그래프 중 간선 개수가 최소인 그래프를 떠올리는 것이 motivation이 될 수 있겠다. 이 때의 간선 집합을 $E_{opt}$라고 정의하자.

또한 다음 알고리즘에 따라 얻어지는 $E$의 subset $E'$을 생각하자.
```
Sort E by non-decreasing weight
E' = {}
for (u, v) in E:
    if d_uv > (distance between u and v in E'):
        add (u, v) to E
return E'
```

목표는 $|E'| = |E_{opt}|$임을 보이는 것이다. 귀류법으로 $|E'| > |E_{opt}|$라고 하자. 그러면 $(E' \setminus E_{opt}) \neq \emptyset$이고, 이 중 weight이 최소인 간선을 $(u, v)$라 하자. $E_{opt}$에 의해서도 $u$와 $v$ 사이의 최단거리가 $d_{uv}$여야 하므로, 어떤 정점 $w \neq u, v$가 존재하여 $d_{uw}+d_{wv} = d_{uv}$를 만족한다. 간선의 weight이 항상 양수이므로, 위 알고리즘은 $(u, w)$와 $(w, v)$를 $(u, v)$보다 먼저 처리했을 것이고, 따라서 $(u, v)$가 처리되는 시점에는 이미 $u \Leftrightarrow w$를 $d_{uw}$의 거리로, $w \Leftrightarrow v$를 $d_{wv}$의 거리로 이동하는 방법이 모두 존재했다는 뜻이다. 즉 if 조건이 실행될 수 없으므로, $(u, v) \in E'$임에 모순.

그러므로 위의 알고리즘으로 만들어진 $|E'|$이 곧 문제의 답이기도 하다.
</details>

<details>
<summary>Trivia</summary>

Undirected weighted graph $G$가 주어졌을 때, subgraph $H$ 위에서의 거리가 $G$ 위에서의 거리를 $t$-approximate할 때 $H$를 $G$의 $t$-spanner라고 부른다. 그러므로 $H$의 edge size를 최대한 줄일 수 있다면, 이는 곧 그래프 위의 metric을 효율적으로 표현할 수 있다는 뜻이다. $k \geq 2$인 integer $k$에 대해, $O(n^{1+1/k})$의 edge size를 갖는 $(2k-1)$-spanner가 존재함이 알려져 있고, 이것이 Erdos girth conjecture가 성립할 때 optimal임도 알려져 있다. [이 논문](https://www.researchgate.net/publication/220452641_On_Sparse_Spanners_of_Weighted_Graphs)이 그러한 $t$-spanner를 찾는 방법을 알려주는데, 실제로 $E'$을 구하는 위의 코드는 이 논문에서 제시된 $t=1$일 때의 $t$-spanner를 구하는 방법이기도 하다. Optimality에 관해서는 [이거](https://www.cs.jhu.edu/~baruch/teaching/600.427/Papers/oracle-STOC-try.pdf)를 참조해봐도 좋겠다.
</details>
