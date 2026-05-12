const projects = [
  {
    id: "aoba",
    name: "青葉台マンション 外壁改修",
    client: "青葉台レジデンス管理組合",
    address: "横浜市青葉区青葉台 2-18",
    manager: "佐藤 拓也",
    period: "2026/05/08 - 2026/06/20",
    progress: 62,
    photos: 148,
    reports: 6,
    hours: 184,
    status: "要確認",
    updated: "2026/05/12 10:20",
    nextAction: "足場検査の承認待ち",
    contract: "3,240,000円",
    risk: "足場検査待ち",
    detail: "北面シーリング打替え中。午後に雨養生を追加予定。",
    steps: [
      ["現地調査", "2026/05/08", true],
      ["足場設置", "2026/05/12", true],
      ["高圧洗浄", "2026/05/16", true],
      ["下地補修", "2026/05/22", false],
      ["塗装仕上げ", "2026/06/08", false]
    ],
    messages: [
      ["田中", "09:12", "北面3階のクラック写真をアルバムに追加しました。"],
      ["佐藤", "09:35", "確認しました。午後の報告書に反映します。"],
      ["高橋", "10:20", "資材搬入は13時着で調整済みです。"]
    ],
    daily: [
      ["2026/05/12", "高圧洗浄、養生補修、近隣対応", false],
      ["2026/05/11", "足場手すり点検、材料検収", true],
      ["2026/05/10", "仮設電源確認、掲示物設置", true]
    ],
    workers: [
      ["田中", 42],
      ["高橋", 38],
      ["鈴木", 35],
      ["村上", 29]
    ]
  },
  {
    id: "sakura",
    name: "桜町戸建 屋根塗装",
    client: "山本 様",
    address: "川崎市中原区桜町 4-2",
    manager: "高橋 美咲",
    period: "2026/05/10 - 2026/05/24",
    progress: 78,
    photos: 92,
    reports: 4,
    hours: 96,
    status: "完了間近",
    updated: "2026/05/12 09:18",
    nextAction: "上塗り完了写真の確認",
    contract: "820,000円",
    risk: "通常",
    detail: "中塗り完了。明日午前に上塗り、午後に付帯部確認。",
    steps: [
      ["近隣挨拶", "2026/05/10", true],
      ["洗浄", "2026/05/11", true],
      ["下塗り", "2026/05/13", true],
      ["中塗り", "2026/05/15", true],
      ["上塗り", "2026/05/17", false]
    ],
    messages: [
      ["高橋", "08:44", "屋根北側の乾燥状態は良好です。"],
      ["山本", "09:02", "ベランダ側も写真で確認できますか？"],
      ["高橋", "09:18", "本日夕方までに完了写真を追加します。"]
    ],
    daily: [
      ["2026/05/12", "屋根中塗り、縁切り確認", false],
      ["2026/05/11", "高圧洗浄、下地清掃", true]
    ],
    workers: [
      ["高橋", 34],
      ["鈴木", 31],
      ["村上", 18]
    ]
  },
  {
    id: "minato",
    name: "港倉庫 防水工事",
    client: "港物流株式会社",
    address: "大田区東海 1-6",
    manager: "中村 一樹",
    period: "2026/05/06 - 2026/06/02",
    progress: 44,
    photos: 203,
    reports: 8,
    hours: 221,
    status: "進行中",
    updated: "2026/05/12 08:24",
    nextAction: "追加補修数量の確認",
    contract: "5,680,000円",
    risk: "材料確認",
    detail: "立上り部の追加補修あり。材料数量を再確認中。",
    steps: [
      ["調査", "2026/05/06", true],
      ["既存撤去", "2026/05/09", true],
      ["下地処理", "2026/05/14", false],
      ["防水層施工", "2026/05/21", false],
      ["水張り試験", "2026/05/30", false]
    ],
    messages: [
      ["中村", "07:58", "A区画の浮き部をマーキング済みです。"],
      ["佐藤", "08:24", "追加見積に必要な数量を日報へ入れてください。"]
    ],
    daily: [
      ["2026/05/12", "既存防水撤去、下地ケレン", false],
      ["2026/05/11", "資材搬入、区画養生", true],
      ["2026/05/10", "荷捌き場安全確認", true]
    ],
    workers: [
      ["中村", 46],
      ["田中", 41],
      ["小林", 37],
      ["伊藤", 33]
    ]
  }
];

const photoTemplates = [
  ["着工前", "外観全景", "5/08 佐藤"],
  ["施工中", "北面シーリング", "5/12 田中"],
  ["施工中", "資材搬入", "5/12 高橋"],
  ["完了", "検査用アップ", "5/13 鈴木"],
  ["施工中", "足場点検", "5/13 村上"],
  ["着工前", "劣化箇所", "5/08 佐藤"],
  ["完了", "是正後", "5/14 田中"],
  ["施工中", "養生状況", "5/14 高橋"]
];

let activeProjectId = projects[0].id;
let activeTab = "cases";

const $ = (selector) => document.querySelector(selector);

function currentProject() {
  return projects.find((project) => project.id === activeProjectId) || projects[0];
}

function renderProjectList() {
  const keyword = $("#projectSearch").value.trim().toLowerCase();
  $("#projectList").innerHTML = projects
    .filter((project) => `${project.name} ${project.client}`.toLowerCase().includes(keyword))
    .map(
      (project) => `
        <button class="project-button ${project.id === activeProjectId ? "is-active" : ""}" data-project="${project.id}">
          <strong>${project.name}</strong>
          <span>${project.client}</span>
        </button>
      `
    )
    .join("");
}

function renderHeader(project) {
  if (activeTab === "cases") {
    const totalPhotos = projects.reduce((total, item) => total + item.photos, 0);
    const totalReports = projects.reduce((total, item) => total + item.reports, 0);
    const totalHours = projects.reduce((total, item) => total + item.hours, 0);
    const averageProgress = Math.round(projects.reduce((total, item) => total + item.progress, 0) / projects.length);
    $("#viewEyebrow").textContent = "案件一覧";
    $("#projectTitle").textContent = "案件一覧";
    $("#projectMeta").textContent = "検索、絞り込み、ステータス確認から案件詳細へ移動";
    $("#progressValue").textContent = `${averageProgress}%`;
    $("#progressMeter").style.width = `${averageProgress}%`;
    $("#photoCount").textContent = `${totalPhotos}枚`;
    $("#reportCount").textContent = `${totalReports}件`;
    $("#hoursValue").textContent = `${totalHours}h`;
    $("#reportButton").textContent = "案件追加";
    return;
  } else {
    $("#viewEyebrow").textContent = "案件ダッシュボード";
    $("#projectTitle").textContent = project.name;
    $("#projectMeta").textContent = `${project.client} / ${project.address} / 担当 ${project.manager}`;
    $("#reportButton").textContent = "報告書を作成";
  }
  $("#progressValue").textContent = `${project.progress}%`;
  $("#progressMeter").style.width = `${project.progress}%`;
  $("#photoCount").textContent = `${project.photos}枚`;
  $("#reportCount").textContent = `${project.reports}件`;
  $("#hoursValue").textContent = `${project.hours}h`;
  $("#riskBadge").textContent = project.risk;
  $("#riskBadge").className = project.risk === "通常" ? "badge subtle" : "badge";
  $("#unreadBadge").textContent = `未読 ${Math.max(0, 5 - project.reports)}`;
  $("#openTasksCount").textContent = projects.reduce((total, item) => total + item.daily.filter((daily) => !daily[2]).length, 0);
}

function renderManagerFilter() {
  const selected = $("#managerFilter").value || "all";
  const managers = [...new Set(projects.map((project) => project.manager))];
  $("#managerFilter").innerHTML = [
    '<option value="all">すべて</option>',
    ...managers.map((manager) => `<option value="${manager}">${manager}</option>`)
  ].join("");
  $("#managerFilter").value = managers.includes(selected) ? selected : "all";
}

function filteredCases() {
  const status = $("#statusFilter").value;
  const manager = $("#managerFilter").value || "all";
  const keyword = $("#caseKeyword").value.trim().toLowerCase();
  return projects.filter((project) => {
    const haystack = `${project.name} ${project.client} ${project.address} ${project.manager}`.toLowerCase();
    const statusOk = status === "all" || project.status === status;
    const managerOk = manager === "all" || project.manager === manager;
    const keywordOk = !keyword || haystack.includes(keyword);
    return statusOk && managerOk && keywordOk;
  });
}

function countOpenTasks(project) {
  return project.daily.filter((daily) => !daily[2]).length + Math.max(0, 5 - project.reports);
}

function renderCaseTable() {
  const cases = filteredCases();
  $("#caseSummaryBadge").textContent = `${cases.length}件`;
  $("#caseTable").innerHTML = cases
    .map(
      (project) => `
        <tr data-project="${project.id}" data-open-detail="true">
          <td class="case-title"><strong>${project.name}</strong><span>${project.address}</span></td>
          <td>${project.client}</td>
          <td><span class="badge ${project.status === "進行中" ? "subtle" : ""}">${project.status}</span></td>
          <td>${project.manager}</td>
          <td class="case-mini-progress"><strong>${project.progress}%</strong><span><i style="width:${project.progress}%"></i></span></td>
          <td class="case-tasks"><strong>${countOpenTasks(project)}件</strong><span>${project.nextAction}</span></td>
          <td>${project.updated}</td>
          <td><button class="ghost-button" data-project="${project.id}" data-open-detail="true">詳細</button></td>
        </tr>
      `
    )
    .join("");
}

function renderCaseKanban() {
  const groups = ["要確認", "進行中", "完了間近"];
  $("#caseKanban").innerHTML = groups
    .map((group) => {
      const items = projects.filter((project) => project.status === group);
      return `
        <section class="kanban-column">
          <h3>${group} ${items.length}件</h3>
          ${items
            .map(
              (project) => `
                <button class="kanban-card" data-project="${project.id}" data-open-detail="true">
                  <strong>${project.name}</strong>
                  <span>${project.nextAction}</span>
                </button>
              `
            )
            .join("")}
        </section>
      `;
    })
    .join("");
}

function renderDetails(project) {
  $("#projectDetails").innerHTML = `
    <dt>工期</dt><dd>${project.period}</dd>
    <dt>責任者</dt><dd>${project.manager}</dd>
    <dt>住所</dt><dd>${project.address}</dd>
    <dt>契約</dt><dd>${project.contract}</dd>
    <dt>状態</dt><dd>${project.status}</dd>
    <dt>メモ</dt><dd>${project.detail}</dd>
  `;
}

function renderTimeline(project) {
  $("#timeline").innerHTML = project.steps
    .map(
      ([name, date, done]) => `
        <div class="step ${done ? "done" : ""}">
          <span class="dot"></span>
          <div><strong>${name}</strong><span>${date}</span></div>
          <span class="badge ${done ? "subtle" : ""}">${done ? "完了" : "予定"}</span>
        </div>
      `
    )
    .join("");
}

function renderChat(project) {
  $("#chatFeed").innerHTML = project.messages
    .map(
      ([author, time, text]) => `
        <article class="message">
          <strong>${author}<time>${time}</time></strong>
          <p>${text}</p>
        </article>
      `
    )
    .join("");
}

function renderPhotos() {
  const selected = $("#photoFilter").value;
  const photos = photoTemplates.filter(([tag]) => selected === "all" || selected === tag);
  $("#photoGrid").innerHTML = photos
    .map(
      ([tag, title, meta], index) => `
        <article class="photo-card">
          <div class="photo-thumb" style="background-image: linear-gradient(rgba(18,48,43,.1), rgba(18,48,43,.24)), url('assets/site-progress.png'); background-position: ${20 + index * 8}% center;"></div>
          <div>
            <strong>${title}</strong>
            <span>${tag} / ${meta}</span>
          </div>
        </article>
      `
    )
    .join("");
}

function renderDaily(project) {
  $("#dailyList").innerHTML = project.daily
    .map(
      ([date, text, approved]) => `
        <article class="daily-item">
          <header><strong>${date}</strong><span class="badge ${approved ? "subtle" : ""}">${approved ? "確認済" : "未確認"}</span></header>
          <p>${text}</p>
        </article>
      `
    )
    .join("");
}

function renderAttendance(project) {
  const max = Math.max(...project.workers.map((worker) => worker[1]));
  $("#attendance").innerHTML = project.workers
    .map(
      ([name, hours]) => `
        <article class="worker-row">
          <header><strong>${name}</strong><span>${hours}h</span></header>
          <div class="worker-bar"><span style="width: ${(hours / max) * 100}%"></span></div>
        </article>
      `
    )
    .join("");
}

function buildReport(project) {
  const done = project.steps.filter((step) => step[2]).map((step) => step[0]).join("、");
  const next = project.steps.find((step) => !step[2])?.[0] || "完了検査";
  return `【${project.name}】進捗報告
顧客: ${project.client}
工期: ${project.period}
現在進捗: ${project.progress}%

本日の状況:
${project.detail}

完了工程:
${done}

次工程:
${next}

添付写真:
自動分類済み ${project.photos} 枚

日報:
${project.daily[0][0]} ${project.daily[0][1]}`;
}

function renderReport(project) {
  $("#reportPreview").textContent = buildReport(project);
}

function renderPanels() {
  document.querySelectorAll("[data-panel]").forEach((panel) => {
    const panels = panel.dataset.panel.split(" ");
    panel.classList.toggle("is-hidden", !panels.includes(activeTab));
  });
  document.querySelectorAll(".tab, .side-menu-item").forEach((tab) => {
    tab.classList.toggle("is-active", tab.dataset.tab === activeTab);
  });
}

function renderAll() {
  const project = currentProject();
  renderProjectList();
  renderManagerFilter();
  renderHeader(project);
  renderCaseTable();
  renderCaseKanban();
  renderDetails(project);
  renderTimeline(project);
  renderChat(project);
  renderPhotos();
  renderDaily(project);
  renderAttendance(project);
  renderReport(project);
  renderPanels();
}

document.addEventListener("click", (event) => {
  const projectButton = event.target.closest("[data-project]");
  if (projectButton) {
    activeProjectId = projectButton.dataset.project;
    if (projectButton.dataset.openDetail) {
      activeTab = "overview";
    }
    renderAll();
  }

  const tabButton = event.target.closest("[data-tab]");
  if (tabButton) {
    activeTab = tabButton.dataset.tab;
    renderAll();
  }
});

$("#projectSearch").addEventListener("input", renderProjectList);
$("#caseKeyword").addEventListener("input", renderCaseTable);
$("#statusFilter").addEventListener("change", renderCaseTable);
$("#managerFilter").addEventListener("change", renderCaseTable);
$("#photoFilter").addEventListener("change", renderPhotos);

$("#chatForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const input = $("#chatInput");
  const text = input.value.trim();
  if (!text) return;
  currentProject().messages.push(["あなた", "今", text]);
  input.value = "";
  renderChat(currentProject());
});

$("#completeStepButton").addEventListener("click", () => {
  const project = currentProject();
  const nextStep = project.steps.find((step) => !step[2]);
  if (nextStep) {
    nextStep[2] = true;
    project.progress = Math.min(100, project.progress + 8);
    renderAll();
  }
});

$("#approveDailyButton").addEventListener("click", () => {
  currentProject().daily.forEach((daily) => {
    daily[2] = true;
  });
  renderDaily(currentProject());
  $("#openTasksCount").textContent = projects.reduce((total, item) => total + item.daily.filter((daily) => !daily[2]).length, 0);
});

$("#reportButton").addEventListener("click", () => {
  if (activeTab === "cases") {
    $("#caseDialog").showModal();
    return;
  }
  activeTab = "overview";
  renderAll();
  $("#reportPreview").scrollIntoView({ behavior: "smooth", block: "center" });
});

$("#copyReportButton").addEventListener("click", () => {
  renderReport(currentProject());
  $("#copyReportButton").textContent = "更新済み";
  window.setTimeout(() => {
    $("#copyReportButton").textContent = "内容を更新";
  }, 1200);
});

$("#syncButton").addEventListener("click", () => {
  $("#syncButton").textContent = "✓";
  window.setTimeout(() => {
    $("#syncButton").textContent = "↻";
  }, 900);
});

$("#exportButton").addEventListener("click", () => {
  $("#exportButton").textContent = "出力済み";
  window.setTimeout(() => {
    $("#exportButton").textContent = "CSV";
  }, 1200);
});

$("#addCaseButton").addEventListener("click", () => {
  $("#caseDialog").showModal();
});

$("#caseDialog").addEventListener("close", () => {
  if ($("#caseDialog").returnValue !== "default") return;
  const values = [...$("#caseDialog").querySelectorAll("input, select")].map((field) => field.value.trim());
  const [name, client, address, manager, period, status] = values;
  const id = `case-${Date.now()}`;
  projects.unshift({
    id,
    name,
    client,
    address,
    manager,
    period,
    progress: 12,
    photos: 0,
    reports: 0,
    hours: 0,
    status,
    updated: "今",
    nextAction: "初回ヒアリング",
    contract: "未設定",
    risk: status,
    detail: "受付直後の案件です。現地調査日を調整してください。",
    steps: [
      ["受付", "今", true],
      ["現地調査", "未定", false],
      ["見積提出", "未定", false],
      ["着工", "未定", false]
    ],
    messages: [["あなた", "今", "新規案件を登録しました。"]],
    daily: [["今", "案件受付、初回確認", false]],
    workers: [[manager, 0]]
  });
  activeProjectId = id;
  activeTab = "overview";
  renderAll();
});

renderAll();
