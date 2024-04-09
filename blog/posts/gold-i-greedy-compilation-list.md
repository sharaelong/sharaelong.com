---
title: 'Gold I Greedy Compilation List'
summary: ''
date: 2024-04-07T11:00:00+09:00
---

Gold I 문제들 중에서도 Greedy 문제들에 대한 풀이/증명을 전부 적어보려는 기획을 시도 중이다. 이걸 시작한 이유는,
1. 보통 greedy가 동일 티어 대비 어렵고,
2. Proof-by-AC를 좀 줄여보고자 하며,
3. 직관력을 기르는 데 도움이 될 것 같음

정도의 이유가 있다. 그리고 증명은 최대한 motivation을 담아서 만드는 걸 목표로 한다. Greedy 문제들의 고질적인 특징인 것 같기도 한데, 답을 찾았으면 증명은 '어떻게든' 만들 수 있기 때문에, ugly한 증명이 튀어나오기 십상이기 때문. 모든 종류의 피드백은 밑의 메일 주소나 discord DM으로 받는다.

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

[[BOJ 28976] Кольцевые дороги](https://boj.kr/28976)
<details>
<summary>Solution</summary>
문제의 notation을 따라, 어떤 쿼리의 각을 $(a, b)$로 두자. 이 때 최적해의 후보가 될 수 있는 도로는 $b$의 바로 오른쪽 혹은 바로 왼쪽 도로 2개뿐임을 보이면 된다. 즘명은 매우 간단한데, 내가 바깥쪽 반지름 $r_2$에서 이동하는 각을 $\theta$만큼 아낄 수 있다면 안쪽 반지름 $r_1 < r_2$에서 이동할 각은 길어져야 $\theta$뿐이기 때문이다.
</details>

[[BOJ 11458] The Fox and the Owl](https://boj.kr/11458)
<details>
<summary>Solution</summary>
문제를 처음 봤을 때 접근할 만한 방식으로 증명을 써 보겠다. $S(x)$를 $x \geq 0$에 대해 $x$의 $10$진법 표현의 자릿수 합으로 정의하자. 또한 $|x|$를 10진법 표현에서의 자릿수라고 하자.

먼저 입력이 양이 아닌 정수 $-n$ $(n \geq 0)$이라고 하자. 이 경우 문제를 다시 쓰면 $n < m$이고 $S(m) = S(n)+1$인 최소의 $m$을 찾는 문제가 된다. $n = \overline{ab99\dots9}$ ($b$는 $9$가 아닌 단일 자릿수를 의미) 그러면 $m = \overline{a(b+1)99\dots9}$가 답이 되는데, 증명은... 이게 충분한 설명일지는 모르겠으나, 가능한 답의 후보를 순서대로 $n+1$, $n+2$, $\dots$처럼 생각했을 때 이 $m$값이 이전에 나오는 수들은 자릿수의 합이 $S(n)+1$일리가 없기 때문이다. 여기서 사용한 notation은 모든 자릿수가 $9$일 때 약간 애매해지는데, $b=0$으로 두고 생각하면 된다. 즉 입력이 $-99$라면 답은 $-199$라는 의미.

이제 입력이 양의 정수일 때가 핵심이다. 먼저 답이 음수가 되지 않는 입력만을 생각해보자. 입력 $n$과 답 $m$에 대해 $0 < m < n$이므로, 이들은 항상 $n = \overline{abc}$, $m = \overline{ab'c'}$과 같이 표현된다. $b$와 $b'$은 단일 자릿수이고 $b'<b$를 만족하며, 편의 상 $|n|=|m|$이되 $m$은 leading zero를 가질 수도 있다고 하자. 만약 $0 \leq b' \leq b-2$인 $m$이 조건을 만족한다면, $b' = b-1$로 두고 $c'$에서 적절히 $0$이 아닌 자릿수들을 감소시키는 작업이 항상 가능하므로 ($S(c') \geq S(c)+2 \geq 0$이기 때문), 최대인 $m$은 항상 $b' = b-1$을 만족한다.

그러므로 $m > 0$이라면 $S(c') = S(c)+2$인데, 따라서 $S(c) \leq 9|c|-2$여야 한다. 우리는 $b$의 위치를 최대한 뒤쪽(least sig)으로 가져가기를 원하므로, $n$을 least significant digit부터 읽어가면서 $S(c) \geq 9|c|-2$가 되는 최소의 $|c|$를 알아냈다고 하자 (존재한다고 치자). 이제 $|c|+1$번째 least significant digit부터 볼 때 $0$이 아닌 최초의 자릿수가 $b$가 될 수 있는 최적의 위치이고, $m = \overline{ab'c'}$에서 $b'=b-1$의 위치와 자릿수까지 결정되었다면 $|c'|$개의 남은 자릿수에 $S(c')=S(c)+2$ 조건을 만족시키는 것은 greedy하게 큰 자릿수를 $9$로 먼저 채워나가는 방식으로 해결 가능.

이 방법의 예외는 다음 두 가지이다: $n = 799$여서 최소의 $|c| = |n|$인 경우나, 아니면 $n = 989$ 같은 수여서 $S(c) \leq 9|c|-2$인 $|c|$가 존재하지 않는 경우이다. 이 경우는 맨 처음에 했던 가정, $m > 0$이라는 조건이 깨지는 경우이다. 그러므로 답이 $-m$ $(m \geq 0)$이라고 두면, 이제는 $n$과 $m$의 대소 관계 없이 $S(m) = S(n)+1$인 최소의 $m$을 찾는 문제가 된다. 이건 방금 전에 $c'$을 구성하는 greedy와 상황이 완전히 똑같으므로, 증명 끝.
</details>
