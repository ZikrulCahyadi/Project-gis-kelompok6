export default function StatCard({ icon: Icon, value, label, gradient = false, delay = 0 }) {
  return (
    <div
      className={`p-6 rounded-2xl animate-fade-up ${
        gradient
          ? "bg-gradient-primary text-primary-foreground shadow-glow"
          : "bg-card border border-border shadow-elegant"
      }`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-4">
        <div
          className={`p-3 rounded-xl ${
            gradient ? "bg-primary-foreground/20" : "bg-primary/10"
          }`}
        >
          <Icon className={`w-6 h-6 ${gradient ? "text-primary-foreground" : "text-primary"}`} />
        </div>
        <div>
          <p className={`text-3xl font-heading font-bold ${gradient ? "" : "text-foreground"}`}>
            {value}
          </p>
          <p className={`text-sm font-body ${gradient ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
            {label}
          </p>
        </div>
      </div>
    </div>
  );
}
